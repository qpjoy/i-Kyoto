import React from "react";
import "./index.scss";
import KeySVG from "@assets/img/svg/key.svg";
import BrainSVG from "@assets/img/svg/brain.svg";

function Footer() {
  return (
    <div className="footer">
      <div className="intro">
        <span className="intro-title">安全高效的 PDF 在线编辑工具</span>

        <div className="intro-content">
          <div className="intro-box">
            <img src={KeySVG} alt="logo" />

            <span className="box-title">隐私与安全性</span>

            <span className="box-content">
              数据通过加密传输，保障数据安全，且文件处理完毕自动清除，不会被任何人使用
            </span>
          </div>

          <div className="intro-box">
            <img src={BrainSVG} alt="logo" />

            <span className="box-title">丰富的编辑功能</span>

            <span className="box-content">
              在线易用的编辑工具，支持对 PDF 文件执行多种操作，包括拆分、合并、转换、重组和压缩等等
            </span>
          </div>
        </div>
      </div>

      <div className="intro-bottom">
        <div className="tool-title">PDF 工具助手</div>
        <div className="pdf-tool"></div>
        <div className="privacys">
          <span>服务条款</span>
          <span>隐私政策</span>
          <span>联系我们</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
