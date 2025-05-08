import { Dialect } from 'sequelize/types';

const workingSchema = 'push_code';

export const config: any = {
  database: {
    dialect: 'postgres' as Dialect,
    // host: 'localhost',
    host: 'postgres',
    port: 5432,
    // port: 4057,
    username: 'root',
    password: 'postgres',
    database: 'push_code',
    logging: true,
  },
  redis: {
    host: 'redis',
    port: 6379,
    // url: `redis://localhost:6379`,
  },
  esConfig: {
    // esUrl: 'http://localhost:9200/',
    esUrl: 'http://124.221.135.239:3105/',
    quizIndex: 'qp-quiz-local',
    apiVersion: 'v1',
    limitLen: 20,
    skipLen: 0,
  },
  qCloud: {
    secretId: '',
    secretKey: '',
    // proxy: process.env.Proxy,
    durationSeconds: 1800,
    bucket: 'qp-exam-1320869019',
    region: 'ap-shanghai',
    // 允许操作（上传）的对象前缀，可以根据自己网站的用户登录态判断允许上传的目录，例子： user1/* 或者 * 或者a.jpg
    // 请注意当使用 * 时，可能存在安全风险，详情请参阅：https://cloud.tencent.com/document/product/436/40265
    allowPrefix: '_ALLOW_DIR_/*',
    // 密钥的权限列表
    allowActions: [
      // 所有 action 请看文档
      // COS actions: https://cloud.tencent.com/document/product/436/31923
      // CI actions: https://cloud.tencent.com/document/product/460/41741
      // 简单上传
      'name/cos:PutObject',
      'name/cos:PostObject',
      // 分片上传
      'name/cos:InitiateMultipartUpload',
      'name/cos:ListMultipartUploads',
      'name/cos:ListParts',
      'name/cos:UploadPart',
      'name/cos:CompleteMultipartUpload',
      // 下载文件
      'name/cos:GetObject',
      // 文本审核任务
      'ci:CreateAuditingTextJob',
    ],
    // condition条件限定，关于 condition 的详细设置规则和COS支持的condition类型可以参考https://cloud.tencent.com/document/product/436/71306
    // condition:{
    //   // 比如限制该ip才能访问cos
    //   'ip_equal': {
    //       'qcs:ip': '192.168.1.1'
    //   },
    // 比如限制上传文件最大为1MB
    //   'numeric_less_than_equal: {
    //     'cos:content-length': 1038336
    // }
    // }
    // 限制的上传后缀
    extWhiteList: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
  },
  ai: {
    baidu: {
      tokenUrl: 'https://aip.baidubce.com/oauth/2.0/token',
      botUrl:
        'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
      client_id: 'IreqmbRSMNY6B8N02GTkpyaK',
      client_secret: '',
      grant_type: 'client_credentials',
    },
  },
  jwtPrivateKey: 'jwtPrivateKey',
  // Schemas to init
  initSchemas: [workingSchema],
  workingSchema: workingSchema,
};
