import React, { useEffect, useRef, useState } from "react";

import { HStack, VStack, Button, Image, Input } from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";
import DanmuJs from "danmu.js";

import choujiangji from "@/assets/image/choujiangji.jpeg";
import gxfc from "@/assets/videoes/gxfc.mp4";

import "./Roll.scss";
import { InputGroup } from "../ui/input-group";
import { createRoot } from "react-dom/client";

function getColor(num: number) {
  return ["red", "orange", "yellow", "green", "blue", "indigo", "violet"][num % 7];
}

const Demo = React.memo(({ text }: any) => {
  const [text2] = useState(text);
  const domRef = useRef(null);

  useEffect(() => {
    // setTimeout(() => {
    //   setText("3333");
    // }, 1000);

    console.log("domRef.current", domRef.current);
    // const danmuDom = document.getElementsByClassName('danMuText');
    // for(var i=0;i<danmuDom.length;i++) {
    //     let element = danmuDom[i];
    //     element.addEventListener('click', () => {
    //         console.log('click');
    //         setText('1111');
    //     });
    // }
  }, []);
  return (
    <div className="danMuText" ref={domRef} onClick={(e) => console.log("onlick", e)} key={text2}>
      {text2}
    </div>
  );
});

// isAuthor = false, isLike = false, showDelete = false
const createDanMuEl = ({ text }: any) => {
  const dom = document.createElement("div");
  // dom.className = cls('container', { isAuthor })

  // eslint-disable-next-line react/no-deprecated
  const root = createRoot(dom);
  root.render(<Demo text={text} />);
  console.log("Created Danmu Element:", dom, dom instanceof HTMLElement);
  // const dom2 = ReactDOM.render(<Demo text={text} />, dom);
  // console.log("aaaa", dom2, dom2 instanceof HTMLElement);
  return dom;
};
const Roll = () => {
  const [username, setUsername] = useState("");
  const [number, SetNumber] = useState(() => {
    return "".padStart(3, "0");
  });
  const danmuContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const danmuInstance = useRef<any>(null);

  // const [danmuInstance, setDanmuInstance] = useState<DanmuJs | null>(null);
  const [comments, setComments]: any = useState<[]>([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const startRoll = async () => {
    if (!username) {
      alert("请输入用户名");
      return;
    }

    if (comments.length) {
      const names = comments.map((comment: any) => comment.name);
      if (names.indexOf(username) >= 0) {
        alert("该用户已存在");
        return;
      }
    }
    let randomNum = Math.floor(Math.random() * 100)
      .toString()
      .padStart(3, "0");
    console.log(randomNum, danmuInstance);
    SetNumber(randomNum);

    let id = comments.length + 1;
    const color = getColor(id);

    const user = { id, name: username, roll: randomNum };
    try {
      const response = await fetch(`${VITE_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      console.log(response);

      setComments(comments.concat(user));

      danmuInstance.current.sendComment({
        //发送弹幕
        duration: 5000,
        id,
        // start: 3000, //不提供该项则立即发送
        txt: `${username}: ${randomNum}`,
        color: true,
        style: {
          color,
          fontSize: "20px",
          border: `solid 1px ${color}`,
          borderRadius: "10px",
          padding: "2px 4px",
          backgroundColor: "rgba(255, 255, 255, 0.1)"
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(1111);
    async function getComments() {
      const response = await fetch(`${VITE_API_URL}/users`);
      let data = [];
      try {
        data = await response.json();
      } catch (e) {
        console.log(e);
      }

      setComments(data);

      const comments = data.map((comment: any) => {
        const color = comment.id && comment.id >= 1 ? getColor(comment.id - 1) : "purple";
        const text = `${comment.name}: ${comment.roll}`;
        console.log(`[Color]: `, color, text);
        return {
          //发送弹幕
          duration: 8000,
          start: comment?.id >= 1 ? Math.floor(Math.random() * (comment.id - 1) * 3000) : 2000, //不提供该项则立即发送
          // txt: text,
          id: comment.id + "",
          // color: true,
          el: createDanMuEl({
            text
          }),
          style: {
            color: color,
            fontSize: "20px",
            // border: `solid 1px ${color}`,
            borderRadius: "10px",
            // padding: "2px 4px",
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }
        };
      });
      // if (danmuContainerRef.current && !danmuInstance.current) {
      // let player = document.getElementById("mse");
      // let container = document.getElementById("DanmuContainer");
      let player = videoRef.current;
      let container = danmuContainerRef.current;

      let danmu = new DanmuJs({
        // needResizeObserver: true,
        // interval: 1500,
        // mouseControl: true,
        // mouseControlPause: false,
        channelSize: 12,
        container,
        containerStyle: {
          zIndex: 100
        },
        // live: true,
        player: player,
        // isLive: true,
        // direction,
        comments,
        // [
        //   {
        //     duration: 5000,
        //     // start: 500,
        //     id: 1 + "",
        //     txt: 1 + "", //弹幕文字内容
        //     el: dom1,
        //     style: {
        //       fontSize: "20px"
        //     }
        //   },
        disableCopyDOM: true,
        mouseControl: true, // 打开鼠标控制, 打开后可监听到 bullet_hover 事件。danmu.on('bullet_hover', function (data) {})
        mouseControlPause: true, // 鼠标触摸暂停。mouseControl: true 生效
        //   channelSize: 24,
        area: {
          start: 0,
          end: 1
        }
      });
      danmuInstance.current = danmu;
      console.log("danmu -0 -- ", danmu, danmuInstance.current);
      // }

      danmuInstance.current.start();

      danmuInstance.current.on("bullet_hover", function (e: any) {
        danmuInstance.current.freezeComment(e.bullet.id);
      });

      setTimeout(() => {
        danmuInstance.current.start();
        console.log("danmu timeout", danmuInstance.current);
      }, 10000);
    }

    getComments();
  }, []);

  return (
    <>
      <div className="video-container">
        <video id="mse" ref={videoRef} autoPlay controls>
          <source src={gxfc} type="video/mp4" />
          your browser does not support the video tag
        </video>
        <div id="DanmuContainer" ref={danmuContainerRef}></div>
      </div>

      <VStack className="chat-box">
        <Image
          className="roll-machine"
          src={choujiangji}
          // boxSize="150px"
          borderRadius="full"
          fit="cover"
          alt="Naruto Uzumaki"
        />

        <div className="roll-result">{number}</div>

        <HStack gap="10" width="50%">
          <InputGroup flex="1" startElement={<LuUser />}>
            <Input
              className="roll-username"
              placeholder="用户名（与游戏名称相同）"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
        </HStack>

        <Button className="roll-button" colorScheme="blue" onClick={startRoll}>
          开始Roll
        </Button>
      </VStack>
    </>
  );
};

export default React.memo(Roll);
