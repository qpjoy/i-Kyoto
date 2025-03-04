import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import * as crypto from 'crypto';

import { FilesService } from '../files/files.service';
import config from 'config';
import QCloud from './q_cloud/QCloud';
import { OCR } from './q_cloud/OCR';
import Collection from 'src/utils/commonLang/Collection';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import QAQ from 'src/utils/data/QAQ';

@Injectable()
export class CloudService {
  cosHost = `${config.qCloud.bucket}.cos.${config.qCloud.region}.myqcloud.com`;

  constructor(
    private readonly filesService: FilesService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async getSign({ user, ext }) {
    if (!config.qCloud.secretId || !config.qCloud.secretKey)
      return {
        code: '-1',
        message: 'secretId or secretKey not ready',
      };
    if (!config.qCloud.bucket || !config.qCloud.region)
      return {
        code: '-1',
        message: 'bucket or regions not ready',
      };
    // if (!config.extWhiteList.includes(ext)) return res.send({code: '-1', message: 'ext not allow'});
    if (!config.qCloud.extWhiteList.includes(ext)) {
      throw new HttpException(`ext not in white list`, HttpStatus.CONFLICT);
    }

    const cosKey = QCloud.generateCosKey({
      path: `user_${user?.id || ''}${
        process.env.NODE_ENV === 'development' ? '_dev' : ''
      }`,
      ext,
    });

    const name = cosKey.split('/').slice(-1)[0];
    const content_type = name.split('.').slice(-1)[0];
    // const Key = sign.cosKey;
    // const protocol = location.protocol === "https:" ? "https:" : "http:";
    const prefix = this.cosHost;
    const url =
      prefix + '/' + QCloud.camSafeUrlEncode(cosKey).replace(/%2F/g, '/');
    const ocrFile = await this.filesService.ocrFile({
      name,
      content_type,
      url,
      mode: 'COS_OCR',
      user_id: user.id,
    });
    console.log(`[ocrFile]: `, ocrFile);

    const ak = config.qCloud.secretId;
    const sk = config.qCloud.secretKey;
    const securityToken = '';

    // 也可以使用临时密钥计算签名，使用临时密钥计算时 前端上传文件时必须上送securityToken字段
    // try {
    //   const tmpData: any = await QCloud.getSts();
    //   ak = tmpData.credentials.tmpSecretId;
    //   sk = tmpData.credentials.tmpSecretKey;
    //   securityToken = tmpData.credentials.sessionToken;
    // } catch (e) {
    //   console.log('get sts error', e);
    // }

    // 开始计算签名
    const qSignAlgorithm = 'sha1';
    const method = 'put';
    let pathname = cosKey;
    pathname.indexOf('/') !== 0 && (pathname = '/' + pathname);
    const qAk = ak;
    const now = Math.round(new Date().getTime() / 1000) - 1;
    const exp = now + 900; // 默认900s过期
    const qSignTime = now + ';' + exp;
    const qKeyTime = now + ';' + exp;
    const queryParams = {};
    const headers = {
      host: this.cosHost,
    };
    const qHeaderList = QCloud.getObjectKeys(headers, true)
      .join(';')
      .toLowerCase();
    const qUrlParamList = QCloud.getObjectKeys(queryParams, true)
      .join(';')
      .toLowerCase();

    // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
    // 步骤一：计算 SignKey
    const signKey = crypto
      .createHmac('sha1', sk)
      .update(qKeyTime)
      .digest('hex');

    // 步骤二：构成 FormatString
    const _formatString = [
      method,
      pathname,
      QCloud.obj2str(queryParams, true),
      QCloud.obj2str(headers, true),
      '',
    ].join('\n');
    const formatString = Buffer.from(_formatString, 'utf8');

    // 步骤三：计算 StringToSign
    const r = crypto.createHash('sha1').update(formatString).digest('hex');
    const stringToSign = ['sha1', qSignTime, r, ''].join('\n');

    // 步骤四：计算 Signature
    const qSignature = crypto
      .createHmac('sha1', signKey)
      .update(stringToSign)
      .digest('hex');

    // 步骤五：构造 Authorization
    const authorization = [
      'q-sign-algorithm=' + qSignAlgorithm,
      'q-ak=' + qAk,
      'q-sign-time=' + qSignTime,
      'q-key-time=' + qKeyTime,
      'q-header-list=' + qHeaderList,
      'q-url-param-list=' + qUrlParamList,
      'q-signature=' + qSignature,
    ].join('&');

    return {
      cosHost: this.cosHost,
      cosKey,
      authorization,
      securityToken: securityToken,
      file: ocrFile,
    };
  }

  async ocr(params) {
    const ocrInstance = new OCR();
    const { url } = params;
    const basicGen = await ocrInstance.generalBasic({
      ImageUrl: url,
    });
    console.log(`[ocr basic gen]: `, basicGen);
    if (basicGen?.code === -1) {
      return basicGen;
    } else if (Collection.isEmpty(basicGen)) {
      return {
        code: -1,
        message: 'No content',
      };
    }
    // TODO: To Index2ES
    // const examResults = this.examinationService.processOCRResult(basicGen);
    // const searchQuiz = await this.elasticsearchService.searchQuiz({
    //   text: basicGen,
    // });
    // console.log(`[Exam es]: `, searchQuiz);

    // 不进行search，拆分题目
    let properties = [];
    try {
      properties = QAQ.recordProcess(basicGen);
      console.log(`[Properties]: `, properties, basicGen);
    } catch (e) {
      console.log(`[Properties]: error `, e);
    }

    let _url = '';
    const protocolIndex = url.indexOf('://');
    if (protocolIndex >= 0) {
      _url = url.substring(protocolIndex + 3, url.length);
    } else {
      _url = url;
    }
    const file = await this.filesService.findOneByUrl(_url);
    console.log(`[file content]: `, file.name, file.id, file.createdAt);

    if (file) {
      file.content = JSON.stringify(basicGen);
      file.status = 'ocred';
      file.properties = properties;
      await file.save();
      return {
        basicGen,
        properties,
        file,
      };
    } else {
      return {
        code: -1,
        message: 'Cant find file, not stored.',
        error: basicGen,
        file,
      };
    }
  }
}
