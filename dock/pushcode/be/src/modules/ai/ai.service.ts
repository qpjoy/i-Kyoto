import { Injectable, Module } from '@nestjs/common';
import axios from 'axios';
import { CreateAiDto } from './dto/create-ai.dto';
import { UpdateAiDto } from './dto/update-ai.dto';
import { SocketService } from 'src/shared/socket/socket.service';

import config from 'config';

const baidu = config.ai.baidu;
// axios.defaults.baseURL = baidu.url;
axios.defaults.headers.post['Content-Type'] = 'application/json';

@Module({
  providers: [SocketService],
})
@Injectable()
export class AiService {
  private baiduAccessToken: string;

  constructor(private readonly socketService: SocketService) {
    this.getBaiduAccessToken();
  }

  create(createAiDto: CreateAiDto) {
    return 'This action adds a new ai';
  }

  findAll() {
    return `This action returns all ai`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ai`;
  }

  update(id: number, updateAiDto: UpdateAiDto) {
    return `This action updates a #${id} ai`;
  }

  remove(id: number) {
    return `This action removes a #${id} ai`;
  }

  askBaiduAi(params) {
    const botUrl = baidu.botUrl;
    const { content, userId } = params;
    console.log(
      `[Socket in ES service]: `,
      this.socketService.getConnectedClients(),
    );
    console.log(`[Ask Baidu]: text content `, content);
    let _content;
    try {
      _content = JSON.parse(content)?.join('');
    } catch (e) {
      console.log(`[Ask Baidu]: JSON Format issue`, e);
      _content = content;
    }
    axios
      .post(
        botUrl,
        {
          messages: [
            {
              role: 'user',
              content: `请给出以下题目的正确答案：${_content}。先给出正确答案，再列出解析。`,
              // content: `作为资深的互联网考试达人，掌握各种考试题库尤其是电力方面，如果不是考试题目不回答。请帮忙回答：${_content} 中的考试相关问题。可能有多道题，忽略前段可能有一些没有意义的字母或者符号，尽量给出语义正确的题目标题、正确答案和解析。标题、正确答案和解析以'$0_0$'间隔,先列正确答案后解析。`,
            },
          ],
          stream: true,
        },
        {
          params: {
            access_token: this.baiduAccessToken,
          },
          responseType: 'stream',
        },
      )
      .then((response) => {
        response.data.on('data', (chunk) => {
          const buf = Buffer.from(chunk);
          const bufStr = buf.toString('utf8');
          const bufArr = bufStr.split('data: ');
          if (bufArr.length > 1) {
            const msg = bufArr[1];
            let msgJSON;
            try {
              msgJSON = JSON.parse(msg);
            } catch (e) {
              console.log(`[AI transform msg2JSON]: error `, e);
              this.socketService.sendMsg({
                id: userId,
                msg: 'AI暂时无法回答您的问题，请查看拍摄的照片内容是否语义正确。确保标题和选项无明显歧义。',
              });
              return;
            }

            this.socketService.sendMsg({
              id: userId,
              msg: msgJSON?.result || '',
            });
            console.log(`[Ask Baidu AI]: `, msgJSON.result);
          }
        });
        response.data.on('end', () => {
          console.log(`[Ask Baidu AI]: end`);
          this.socketService.sendEnd({
            id: userId,
            msg: 'end',
          });
        });
      });
  }

  async getBaiduAccessToken() {
    return;
    let _access_token = null;
    try {
      const params = {
        client_id: baidu.client_id,
        client_secret: baidu.client_secret,
        grant_type: baidu.grant_type,
      };
      console.log(`[Config]: params `, params, baidu.tokenUrl);
      const accessTokenRes = await axios.get(`${baidu.tokenUrl}`, {
        params,
      });
      if (accessTokenRes.status == 200) {
        console.log(`[BaiduService]: `, accessTokenRes.data);
        const {
          // refresh_token,
          expires_in,
          // session_key,
          access_token,
          // scope,
          // session_secret,
        } = accessTokenRes.data;
        this.baiduAccessToken = access_token;
        _access_token = access_token;

        if (expires_in) {
          setTimeout(
            () => {
              this.getBaiduAccessToken();
            },
            expires_in - 3600 * 10,
          );
        }
      } else {
        console.log(
          `[BaiduService]: baidu accessToken status `,
          accessTokenRes.status,
        );
      }
    } catch (e) {
      // setTimeout(() => {
      //   this.getBaiduAccessToken();
      // }, 3600 * 1000);
      console.log(`[BaiduService Err]:  Baidu AccessToken`, e);
    }
    return _access_token;
  }
}
