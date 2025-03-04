import * as tencentcloud from 'tencentcloud-sdk-nodejs';
import config from 'config';

const OcrClient = tencentcloud.ocr.v20181119.Client;

export class OCR {
  client: any;
  constructor() {
    this.client = new OcrClient({
      // 腾讯云认证信息
      credential: {
        secretId: config.qCloud.secretId,
        secretKey: config.qCloud.secretKey,
      },
      // 产品地域
      region: config.qCloud.region,
      // 可选配置实例
      profile: {
        signMethod: 'TC3-HMAC-SHA256', // 签名方法
        httpProfile: {
          reqMethod: 'POST', // 请求方法
          reqTimeout: 40, // 请求超时时间，默认60s
        },
      },
    });
  }

  // "ImageUrl": "https://ocr-demo-1254418846.cos.ap-guangzhou.myqcloud.com/card/IDCardOCR/IDCardOCR1.jpg"

  generalBasic(params) {
    return this.client.GeneralBasicOCR(params).then(
      (data) => {
        // console.log(data)
        const returnDT = data.TextDetections.map((dt) => {
          return dt.DetectedText;
        });
        console.log(returnDT);
        return returnDT;
      },
      (err) => {
        console.log('error', err.message, Object.keys(err));
        return {
          code: -1,
          message: err.message,
        };
      },
    );
  }
}
