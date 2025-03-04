import { memo } from "react";
import Content from "./content.mdx";
import "./github.md.scss";
import "./Tutor.scss";
import Footer from "../Components/Footer";
import TDK from "../Components/TDK";

function Tutor() {
  return (
    <>
      <TDK
        title="PushCode 推流助手使用教程"
        description="推流助手软件使用教程，一键获取推流码，支持OBS直播推流，让直播更高效"
        keywords="推流助手使用教程,抖音推流码,OBS推流码,推流码获取,推流码工具,直播推流码,获取推流码软件"
      />
      <div className="tutor">
        <div className="tutor-header"></div>
        <div
          className="tutor-content markdown-body section-box"
          style={
            {
              // width: "60%",
            }
          }
        >
          <Content />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default memo(Tutor);
