# PushCode 推流助手使用文档

### 使用教程

- 安装流程：

  - 打开「开始」菜单，输入 Windows PowerShell；
  - 管理员身份运行 PowerShell，输入： "Set-ExecutionPolicy RemoteSigned" 回车, 再输入 "Y" 确认；
  - 下载安装包，右键以管理员身份打开安装程序，为所有用户安装。安装完成继续安装 Wireshark，安装完成后右键管理员运行软件即可使用。

  ![image](fe/main/src/assets/pushcode/协议.png)
  ![image](fe/main/src/assets/pushcode/为所有用户安装.png)
  ![image](fe/main/src/assets/pushcode/安装向导.png)

- 订阅流程：

  - 订阅有设备、时间区分，可以使用下面 API 教程设置。

- 开播流程

  - 自动开播流程

    - 点击 PushCode 软件左侧「抖音服务」，打开「自动化流程」按钮，系统将检测并启动
      OBS 并自动完成设置，手动选择对应网卡（打开电脑设置 - 网络状态 - 更改适配器选项，即可查询目前使用的网卡），打开「抖音直播伴侣」软件，点击「开始直播」后，系统将自动开始
      OBS 直播，直播开始后关闭「抖音直播伴侣」，下播点击 OBS 「停止直播」即可。

    ![image](fe/main/src/assets/pushcode/自动化.png)

- 手动开播流程

  - 点击 PushCode 软件左侧「抖音服务」，选择对应网卡（打开电脑设置 - 网络状态 - 更改适配器选项，即可查询目前使用的网卡），打开「抖音直播伴侣」软件，点击「开始直播」后，复制获取的「服务器」「串流密钥」到 OBS，将内容粘贴在「直播 - 服务器/推流码」，点击「应用」和「确定」

  ![image](fe/main/src/assets/pushcode/OBS服务器.png)

  - 打开「抖音直播伴侣」，右上角点击「退出并关闭直播间」

  ![image](fe/main/src/assets/pushcode/直播伴侣.png)

  - 点击 OBS「开始直播」

  ![image](fe/main/src/assets/pushcode/开始直播.png)

  - 关闭 PushCode 软件，正常进行后续直播，下播点击 OBS 「停止直播」即可。

### PushCode API 使用

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
