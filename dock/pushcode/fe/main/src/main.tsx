import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "amfe-flexible";
import TDK from "./features/Components/TDK/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TDK
      title="PushCode 推流助手"
      description="一键获取推流码，支持OBS直播推流，让直播更高效"
      keywords="抖音推流码,OBS直播,OBS推流码,推流码获取,推流码工具,直播推流码,获取推流码软件,tiktok推流码,抖音直播"
    />
    <App />
  </React.StrictMode>
);
