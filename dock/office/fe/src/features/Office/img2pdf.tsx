import { Outlet } from "react-router";
import PDF from "@/assets/img/svg/pdf.svg";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Operation, useFileStore } from "@/store/slices/fileSlice";
import { useEffect } from "react";

export default function IMG2PDF() {
  const clearAll = useFileStore((s) => s.clearAll);
  const setOperation = useFileStore.use.setOperation();

  useEffect(() => {
    clearAll(); // Clear files when page mounts
    setOperation(Operation.IMAGE2PDF);
  }, []);

  return (
    <div className="pdf-box">
      <div className="pdf-title">
        <img src={PDF} />
        <span>图片 转 PDF</span>
      </div>
      <div className="pdf-content">将图片格式转换成PDF</div>
      <FileUploader operation={Operation.IMAGE2PDF} />
      {/* will either be <PDF> or <Settings> */}
      <Outlet />
    </div>
  );
}
