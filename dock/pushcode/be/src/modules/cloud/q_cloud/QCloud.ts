import config from 'config';
import * as STS from 'qcloud-cos-sts';
import fs from 'fs';

class QCloud {
  static camSafeUrlEncode(str) {
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A');
  }

  static getObjectKeys(obj, forKey?) {
    const list = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        list.push(forKey ? QCloud.camSafeUrlEncode(key).toLowerCase() : key);
      }
    }
    return list.sort(function (a, b) {
      a = a.toLowerCase();
      b = b.toLowerCase();
      return a === b ? 0 : a > b ? 1 : -1;
    });
  }

  /**
   * obj转为string
   * @param  {Object}  obj                需要转的对象，必须
   * @param  {Boolean} lowerCaseKey       key是否转为小写，默认false，非必须
   * @return {String}  data               返回字符串
   */
  static obj2str(obj, lowerCaseKey) {
    let i, key, val;
    const list = [];
    const keyList = this.getObjectKeys(obj);
    for (i = 0; i < keyList.length; i++) {
      key = keyList[i];
      val = obj[key] === undefined || obj[key] === null ? '' : '' + obj[key];
      key = lowerCaseKey
        ? QCloud.camSafeUrlEncode(key).toLowerCase()
        : QCloud.camSafeUrlEncode(key);
      val = QCloud.camSafeUrlEncode(val) || '';
      list.push(key + '=' + val);
    }
    return list.join('&');
  }

  // 生成要上传的 COS 文件路径文件名
  static generateCosKey({ path, ext }) {
    const date = new Date();
    const m = date.getMonth() + 1;
    const ymd = `${date.getFullYear()}${m < 10 ? `0${m}` : m}${date.getDate()}`;
    const r = ('000000' + Math.random() * 1000000).slice(-6);
    const cosKey = `${path}/${ymd}/${ymd}_${r}${ext ? `.${ext}` : ''}`;
    return cosKey;
  }
  //   var cosHost = `${config.bucket}.cos.${config.region}.myqcloud.com`;
  // 获取临时密钥
  static getSts() {
    return new Promise((resolve, reject) => {
      // 获取临时密钥
      const AppId = config.qCloud.bucket.substr(
        config.qCloud.bucket.lastIndexOf('-') + 1,
      );
      // 数据万象DescribeMediaBuckets接口需要resource为*,参考 https://cloud.tencent.com/document/product/460/41741
      const policy = {
        version: '2.0',
        statement: [
          {
            action: config.qCloud.allowActions,
            effect: 'allow',
            resource: [
              // cos相关授权路径
              'qcs::cos:' +
                config.qCloud.region +
                ':uid/' +
                AppId +
                ':' +
                config.qCloud.bucket +
                '/' +
                config.qCloud.allowPrefix,
              // ci相关授权路径 按需使用
              'qcs::ci:' +
                config.qCloud.region +
                ':uid/' +
                AppId +
                ':bucket/' +
                config.qCloud.bucket +
                '/' +
                'job/*',
            ],
          },
        ],
      };
      const startTime = Math.round(Date.now() / 1000);
      STS.getCredential(
        {
          secretId: config.qCloud.secretId,
          secretKey: config.qCloud.secretKey,
          //   proxy: config.qCloud.proxy,
          // region: config.qCloud.region,
          durationSeconds: config.qCloud.durationSeconds,
          // endpoint: 'sts.internal.tencentcloudapi.com', // 支持设置sts内网域名
          policy: policy,
        },
        function (err, tempKeys) {
          if (tempKeys) tempKeys.startTime = startTime;
          if (err) {
            reject(err);
          } else {
            resolve(tempKeys);
          }
        },
      );
    });
  }

  static replaceBucketRegion(filePath) {
    return (req, res, next) => {
      let content = fs
        .readFileSync(filePath)
        .toString()
        .replace(
          /(var config = {\r?\n *Bucket: ')test-1250000000(',\r?\n *Region: ')ap-guangzhou(')/,
          '$1' + config.qCloud.bucket + '$2' + config.qCloud.region + '$3',
        );
      if (process.env.Uin) {
        content = content
          .replace(
            "config.Uin = '10001';",
            "config.Uin = '" + process.env.Uin + "'",
          )
          .replace("Uin: '10001'", "Uin: '" + process.env.Uin + "'");
      }
      res.header('Content-Type', 'application/javascript');
      res.send(content);
    };
  }
}

export default QCloud;
// export default new QCloud();
