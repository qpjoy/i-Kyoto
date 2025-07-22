import { Outlet } from "react-router";
import "./pdf2word.scss";
import DOCX from "@assets/img/svg/docx.svg";
import FileUploader from "@/components/FileUploader/FileUploader";

export default function PDF2WORD() {
  return (
    <div className="pdf2word">
      <div className="pdf-title">
        <img src={DOCX} />
        <span>PDF 转 Word</span>
      </div>

      <div className="pdf-content">将 PDF 文档转换为 Word 文档</div>

      <FileUploader />

      {/* will either be <PDF> or <Settings> */}
      <Outlet />
    </div>
  );
}
