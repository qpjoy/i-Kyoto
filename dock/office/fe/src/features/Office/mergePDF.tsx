import { Outlet } from "react-router";
import PDF from "@/assets/img/svg/pdf.svg";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Operation, useFileStore } from "@/store/slices/fileSlice";
import { useEffect } from "react";

export default function mergePDF() {
  const clearAll = useFileStore((s) => s.clearAll);
  const setOperation = useFileStore.use.setOperation();

  useEffect(() => {
    clearAll(); // Clear files when page mounts
    setOperation(Operation.mergePDF);
  }, []);

  return (
    <div className="pdf-box">
      <div className="pdf-title">
        <img src={PDF} />
        <span>Merge PDF</span>
      </div>
      <div className="pdf-content">合并 PDF 文档</div>
      <FileUploader operation={Operation.mergePDF} />
      {/* will either be <PDF> or <Settings> */}
      <Outlet />
    </div>
  );
}
