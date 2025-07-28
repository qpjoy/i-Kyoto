import React, { useRef, useState } from "react";
import { Operation, useFileStore } from "@/store/slices/fileSlice";
import CloudSVG from "@assets/img/svg/cloud.svg";
import "./FileUploader.scss";
import { api } from "@/store/variables";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { SelectChangeEvent } from "@mui/material/Select";

const FileUploader: any = ({ operation }: any) => {
  const addFiles = useFileStore.use.addFiles();
  const uploadFile = useFileStore.use.pdf2word();
  // const uploadAll = useFileStore.use.uploadAll();
  const removeFile = useFileStore.use.removeFile();
  const clearAll = useFileStore.use.clearAll();
  const mergePDFs = useFileStore.use.mergePDFs();
  const image2pdf = useFileStore.use.image2pdf();
  const image2pdfs = useFileStore.use.image2pdfs();
  const splitpdf = useFileStore.use.splitpdf();
  const files = useFileStore.use.files();
  const setImage2pdfOptions = useFileStore.use.setImage2pdfOptions();
  const fitOption = useFileStore((s) => s.image2pdfOptions.fitOption);
  const autoRotate = useFileStore((s) => s.image2pdfOptions.autoRotate);
  const colorType = useFileStore((s) => s.image2pdfOptions.colorType);
  const override = useFileStore((s) => s.image2pdfOptions.override);
  const pageNumbers = useFileStore((s) => s.splitpdfOptions.pageNumbers);
  const setSplitpdfOptions = useFileStore.use.setSplitpdfOptions();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  // const [uploading, setUploading] = useState(false);
  const handleLocalFiles = (list: FileList | null) => {
    if (list) addFiles(Array.from(list));
  };

  const [isAutoRotate, setIsAutoRotate] = useState(false);

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

  // const mergePDF = async () => {
  //   await mergePDFs();
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
        <div
          style={{
            marginTop: 16,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
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
                  <a href={`${api}/uploads/${f.url}`} target="_blank" rel="noreferrer">
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

          {/* <button onClick={() => {}} style={{ marginRight: 8 }}>
            Upload All
          </button> */}

          <button onClick={clearAll}>Clear</button>
        </div>
      )}
      {
        // fitOption: fillPage
        // colorType: color
        // override: multi
        // conversionType: convert
        operation === Operation.IMAGE2PDF ? (
          <Box
            sx={{
              width: "60%"
              // margin: "0 auto"
            }}
          >
            <FormControl
              fullWidth
              sx={{
                marginTop: ".5rem"
              }}
            >
              <InputLabel id="image-options">图片适应选项</InputLabel>
              <Select
                labelId="image-options"
                id="image-options-select"
                value={fitOption}
                label="图片适应选项"
                onChange={(e) => setImage2pdfOptions("fitOption", e.target.value as typeof fitOption)}
              >
                <MenuItem value={"fillPage"}>填充页面</MenuItem>
                <MenuItem value={"fitDocumentToImage"}>适应图片大小</MenuItem>
                <MenuItem value={"maintainAspectRatio"}>保持纵横比例</MenuItem>
              </Select>
            </FormControl>
            {/* autoRotate on */}
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  value={isAutoRotate}
                  onChange={(e) => {
                    setIsAutoRotate(e.target.checked);
                    setImage2pdfOptions("autoRotate", isAutoRotate ? "on" : "off");
                  }}
                />
              }
              label="自动旋转 PDF"
            />
            {/* colorType */}
            <FormControl
              fullWidth
              sx={{
                marginTop: ".5rem"
              }}
            >
              <InputLabel id="color-type">颜色类型</InputLabel>
              <Select
                labelId="color-type"
                id="color-type-select"
                value={colorType}
                label="图片适应选项"
                onChange={(e) => setImage2pdfOptions("colorType", e.target.value as typeof colorType)}
              >
                <MenuItem value={"color"}>颜色</MenuItem>
                <MenuItem value={"greyscale"}>灰度</MenuItem>
                <MenuItem value={"blackwhite"}>黑白（可能丢失数据！）</MenuItem>
              </Select>
            </FormControl>

            {/* override: multi, conversionType: convert */}
            {/* override:  single,  conversionType: merge */}
            <FormControl
              fullWidth
              sx={{
                marginTop: ".5rem"
              }}
            >
              <InputLabel id="files-logic">多文件逻辑</InputLabel>
              <Select
                labelId="files-logic"
                id="files-logic-select"
                value={override}
                label="图片适应选项"
                onChange={(e) => {
                  if (e.target.value === "single") {
                    setImage2pdfOptions("override", e.target.value as typeof colorType);
                    setImage2pdfOptions("conversionType", "merge");
                  } else if (e.target.value === "multi") {
                    setImage2pdfOptions("override", e.target.value as typeof colorType);
                    setImage2pdfOptions("conversionType", "convert");
                  }
                }}
              >
                <MenuItem value={"single"}>合并成一个 PDF 文件</MenuItem>
                <MenuItem value={"multi"}>转换为独立的PDF文件</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              sx={{
                marginTop: ".5rem"
              }}
              onClick={() => {
                const ids = files.map((file) => file.id);
                if (override === "multi") {
                  image2pdfs(ids);
                } else {
                  image2pdf(ids);
                }
              }}
              style={{ marginRight: 8 }}
            >
              转换
            </Button>
          </Box>
        ) : operation === Operation.mergePDF ? (
          <>
            <button onClick={() => mergePDFs(files.map((file) => file.id))} style={{ marginRight: 8 }}>
              Merge PDF
            </button>
          </>
        ) : operation === Operation.SPLITPDF ? (
          <Box
            sx={{
              width: "60%"
            }}
          >
            <TextField
              label="输入要分割的页面："
              variant="standard"
              color="warning"
              focused
              value={pageNumbers}
              onChange={(e) => setSplitpdfOptions("pageNumbers", e.target.value)}
            />
            <Accordion
              sx={{
                margin: ".5rem 0"
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="div" sx={{ fontSize: "1.3rem" }}>
                  信息：
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="span" sx={{ fontSize: "1.3rem" }}>
                  选择希望进行分割的页数
                </Typography>
                <Typography component="div" sx={{ fontSize: "1rem" }}>
                  如选择1,3,7-9将把一个 10 页的文件分割成6个独立的PDF：
                </Typography>
                <Typography component="div" sx={{ fontSize: "1rem" }}>
                  文档 #1：第 1 页
                </Typography>
                <Typography component="div" sx={{ fontSize: "1rem" }}>
                  文档 #2：第 2 页和第 3 页{" "}
                </Typography>
                <Typography component="div" sx={{ fontSize: "1rem" }}>
                  文档 #3：第 4 页、第 5 页、第 6 页和第 7 页{" "}
                </Typography>
                <Typography component="div" sx={{ fontSize: "1rem" }}>
                  文档 #4：第 7 页{" "}
                </Typography>
                <Typography component="div" sx={{ fontSize: "1rem" }}>
                  文档 #5：第 8 页{" "}
                </Typography>
                <Typography component="div" sx={{ fontSize: "1rem" }}>
                  文档 #6：第 9 页和第 10 页{" "}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <button onClick={() => splitpdf(files[0]["id"])} style={{ marginRight: 8 }}>
              Split PDF
            </button>
          </Box>
        ) : null
      }

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
