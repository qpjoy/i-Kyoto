import { useNavigate } from "react-router";
import PDF2EXCEL from "@/assets/img/pdf2excel.png";
import PDF from "@/assets/img/pdf.png";
import JPG2PDF from "@/assets/img/jpg2pdf.png";
import PDF2WORD from "@/assets/img/svg/docx.svg";
import MERGEPDF from "@/assets/img/svg/pdf.svg";
import PDF2JPG from "@/assets/img/svg/pdf2jpg.svg";
import PDF2HTML from "@/assets/img/svg/pdf2html.svg";
import PDF2TXT from "@/assets/img/svg/pdf2txt.svg";

import "./Sections.scss";
export default function Sections() {
  const navigate = useNavigate();
  // const handleTools = (url) => {
  //   navigate;
  // };
  return (
    <div className="sections">
      <div className="section">
        <div className="section_title">热门工具</div>
        <div className="section_content">
          <div className="card" onClick={() => navigate("pdf-to-word")}>
            <img className="card_logo" src={PDF2WORD} />
            <div className="card_content">PDF 转 WORD</div>
          </div>

          <div className="card" onClick={() => navigate("merge-pdf")}>
            <img className="card_logo" src={MERGEPDF} />
            <div className="card_content">合并 PDF</div>
          </div>

          <div className="card" onClick={() => navigate("image-to-pdf")}>
            <img className="card_logo" src={JPG2PDF} />
            <div className="card_content">图片 转 PDF</div>
          </div>

          <div className="card" onClick={() => navigate("split-pdf")}>
            <img className="card_logo" src={MERGEPDF} />
            <div className="card_content">分割 PDF</div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section_title">格式转换</div>
        <div className="section_content">
          <div className="card" onClick={() => navigate("pdf-to-excel")}>
            <img className="card_logo" src={PDF2EXCEL} />
            <div className="card_content">PDF 转 Excel</div>
          </div>

          <div className="card" onClick={() => navigate("pdf-to-ppt")}>
            <img className="card_logo" src={PDF2EXCEL} />
            <div className="card_content">PDF 转 PPT</div>
          </div>

          <div className="card" onClick={() => navigate("pdf-to-word")}>
            <img className="card_logo" src={PDF2WORD} />
            <div className="card_content">PDF 转 Word</div>
          </div>

          <div className="card" onClick={() => navigate("pdf-to-jpg")}>
            <img className="card_logo" src={PDF2JPG} />
            <div className="card_content">PDF 转 JPG</div>
          </div>
        </div>

        <div
          className="section_content"
          style={{
            justifyContent: "flex-start"
          }}
        >
          <div className="card" onClick={() => navigate("pdf-to-html")}>
            <img className="card_logo" src={PDF2HTML} />
            <div className="card_content">PDF 转 HTML</div>
          </div>

          <div className="card" onClick={() => navigate("pdf-to-txt")}>
            <img className="card_logo" src={PDF2TXT} />
            <div className="card_content">PDF 转 TXT</div>
          </div>

          <div className="card" onClick={() => navigate("jpg-to-word")}>
            <img className="card_logo" src={PDF2JPG} />
            <div className="card_content">图片 转 Word</div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section_title">文档编辑</div>
        <div className="section_content">
          <div className="card" onClick={() => navigate("merge-pdfs")}>
            <img className="card_logo" src={PDF2EXCEL} />
            <div className="card_content">合并 PDF</div>
          </div>

          <div className="card" onClick={() => navigate("split-pdfs")}>
            <img className="card_logo" src={PDF2EXCEL} />
            <div className="card_content">分割 PDF</div>
          </div>

          <div className="card" onClick={() => navigate("delete-pdf-pages")}>
            <img className="card_logo" src={PDF2WORD} />
            <div className="card_content">删除 PDF 页面</div>
          </div>

          <div className="card" onClick={() => navigate("pdf-to-excel")}>
            <img className="card_logo" src={PDF2WORD} />
            <div className="card_content">PDF 签名</div>
          </div>
        </div>
        <div className="section_content">
          <div className="card" onClick={() => navigate("pdf-water")}>
            <img className="card_logo" src={PDF2WORD} />
            <div className="card_content">PDF 添加水印</div>
          </div>

          <div className="card" onClick={() => navigate("encrypt-pdf")}>
            <img className="card_logo" src={PDF2WORD} />
            <div className="card_content">PDF 加密</div>
          </div>

          <div className="card" onClick={() => navigate("compress-pdf")}>
            <img className="card_logo" src={PDF2WORD} />
            <div className="card_content">压缩 PDF</div>
          </div>

          <div className="card" onClick={() => navigate("pdf-compaire")}>
            <img className="card_logo" src={PDF2WORD} />
            <div className="card_content">PDF 比对</div>
          </div>
        </div>

        <div className="section_content">
          <div className="card" onClick={() => navigate("pdf-remove-water")}>
            <img className="card_logo" src={PDF2WORD} />
            <div className="card_content">PDF 去除水印</div>
          </div>
        </div>
      </div>
    </div>
  );
}
