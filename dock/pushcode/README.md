# PushCode

本项目采用 docker, yarn 管理

项目分为 3 块

1. 桌面端 push-desk

- 可以自己打包，或者下载现成的 exe 文件

2. 官网 push-main，包含使用教程

- 访问：http://localhost:8080/pushcode/

3. 服务器 push-be

- 访问：http://localhost:9056/
- 用户，设备，订阅等功能
- 重要： 设备号 在用户目录下，删除.elappid 可以重新注册

4. pgadmin 数据库管理后台

- 访问：http://localhost:4904/

5. postgres 数据库

- 端口：docker 内网 postgres:5432，外部访问 localhost:4057

6. Mock

- 订阅数据 POST: http://localhost:9056/v2/mock/user-sub
- 设备数：
  POST: http://localhost:9056/v2/users/add-device
  { email: "409747494@qq.com", "amount": 5 }
- 订阅类型： POST: http://localhost:9056/v2/users/add-subscription
  { email: "409747494@qq.com", "subscription_name": "年度会员" }

###

```bash
# 1. 在D盘新建 data 文件夹
# 2. 启动容器
docker-compose up
# 3.
```
