import React, { useRef, useState } from "react";
import { useFileStore } from "@/store/slices/fileSlice";
import "./FileUploader.scss";
import CloudSVG from "@assets/img/svg/cloud.svg";

const FileUploader: React.FC = () => {
  const addFiles = useFileStore.use.addFiles();
  const uploadFile = useFileStore.use.uploadFile();
  const uploadAll = useFileStore.use.uploadAll();
  const removeFile = useFileStore.use.removeFile();
  const clearAll = useFileStore.use.clearAll();
  const files = useFileStore.use.files();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  // const [uploading, setUploading] = useState(false);
  const handleLocalFiles = (list: FileList | null) => {
    if (list) addFiles(Array.from(list));
  };

  // const handleFiles = (selected: FileList | null) => {
  //   if (!selected) return;
  //   setFiles(Array.from(selected));
  // };

  // const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setDragOver(false);
  //   handleFiles(e.dataTransfer.files);
  // };

  // const uploadFiles = async () => {
  //   const formData = new FormData();
  //   files.forEach((file) => formData.append("files", file));

  //   setUploading(true);
  //   try {
  //     const res = await fetch("/upload", {
  //       method: "POST",
  //       body: formData
  //     });
  //     if (!res.ok) throw new Error(await res.text());
  //     alert("Upload successful!");
  //     setFiles([]);
  //   } catch (err: any) {
  //     alert("Upload failed: " + err.message);
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  return (
    <div className="uploader">
      <div
        className="uploader-box"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleLocalFiles(e.dataTransfer.files);
        }}
        style={{
          background: dragOver ? "#e3f2fd" : "white"
        }}
      >
        <img src={CloudSVG} />
        <a className="uploader-button btn">选择本地文档</a>
        <p className="uploader-title">或将文档拖到这里</p>
        <input
          type="file"
          ref={fileInputRef}
          hidden
          multiple
          onChange={(e) => handleLocalFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {files.map((f) => (
              <li key={f.id} style={{ marginBottom: 8 }}>
                <strong>{f.file.name}</strong>
                <span style={{ marginLeft: 6, fontSize: 12, color: "#666" }}>
                  ({(f.file.size / 1024).toFixed(1)} KB)
                </span>

                {/* status / progress */}
                <span style={{ marginLeft: 12 }}>
                  {f.status === "uploading" && `${f.progress}%`}
                  {f.status === "done" && "✓"}
                  {f.status === "error" && "⚠"}
                </span>

                {/* actions */}
                <button
                  onClick={() => uploadFile(f.id)}
                  disabled={f.status === "uploading"}
                  style={{ marginLeft: 12 }}
                >
                  {f.status === "waiting" ? "Upload" : "Retry"}
                </button>
                <button onClick={() => removeFile(f.id)} style={{ marginLeft: 4 }}>
                  ✕
                </button>

                {f.url ? (
                  <a
                    href={`http://43.246.210.144:9101/api/uploads/pdf2word/${f.url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    下载转换文件
                    {f.url}
                  </a>
                ) : (
                  <></>
                )}

                {/* simple progress bar */}
                {f.status === "uploading" && (
                  <div style={{ height: 4, background: "#eee", marginTop: 4 }}>
                    <div style={{ width: `${f.progress}%`, height: "100%", background: "#4caf50" }} />
                  </div>
                )}
                {f.error && <div style={{ color: "red", fontSize: 12 }}>{f.error}</div>}
              </li>
            ))}
          </ul>

          <button onClick={uploadAll} style={{ marginRight: 8 }}>
            Upload All
          </button>
          <button onClick={clearAll}>Clear</button>
        </div>
      )}

      {/* {files.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <ul>
            {files.map((f, i) => (
              <li key={i}>
                {f.name} ({(f.size / 1024).toFixed(1)} KB)
              </li>
            ))}
          </ul>
          <button onClick={uploadFiles} disabled={uploading} style={{ marginTop: 12 }}>
            {uploading ? "Uploading…" : "Upload"}
          </button>
        </div>
      )} */}
    </div>
  );
};

export default FileUploader;
