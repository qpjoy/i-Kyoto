import { Outlet } from "react-router";
import PDF from "@/assets/img/svg/pdf.svg";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Operation, useFileStore } from "@/store/slices/fileSlice";
import { useEffect } from "react";

export default function splitPDF() {
  const clearAll = useFileStore((s) => s.clearAll);
  const setOperation = useFileStore.use.setOperation();

  useEffect(() => {
    clearAll(); // Clear files when page mounts
    setOperation(Operation.SPLITPDF);
  }, []);

  return (
    <div className="pdf-box">
      <div className="pdf-title">
        <img src={PDF} />
        <span>分割 PDF</span>
      </div>
      <div className="pdf-content">将 PDF 分割成多个文件</div>
      <FileUploader operation={Operation.SPLITPDF} />
      {/* will either be <PDF> or <Settings> */}
      <Outlet />
    </div>
  );
}
