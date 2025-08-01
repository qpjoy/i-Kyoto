import { Outlet } from "react-router";
import DOCX from "@assets/img/svg/docx.svg";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Operation, useFileStore } from "@/store/slices/fileSlice";
import { useEffect } from "react";

export default function PDF2WORD() {
  const clearAll = useFileStore((s) => s.clearAll);
  const setOperation = useFileStore((s) => s.setOperation);

  useEffect(() => {
    clearAll(); // Clear files when page mounts
    setOperation(Operation.PDF2WORD);
  }, []);

  return (
    <div className="pdf-box">
      <div className="pdf-title">
        <img src={DOCX} />
        <span>PDF 转 Word</span>
      </div>

      <div className="pdf-content">将 PDF 文档转换为 Word 文档</div>

      <FileUploader operation={Operation.PDF2WORD} />

      {/* will either be <PDF> or <Settings> */}
      <Outlet />
    </div>
  );
}
