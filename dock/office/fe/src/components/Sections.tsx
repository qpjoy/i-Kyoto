import { useNavigate } from "react-router";
import PDF2EXCEL from "@/assets/img/pdf2excel.png";
import PDF from "@/assets/img/pdf.png";
import JPG2PDF from "@/assets/img/jpg2pdf.png";
import PDF2WORD from "@/assets/img/svg/docx.svg";
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
            <div className="card_content">PDF转WORD</div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section_title">格式转换</div>
        <div className="section_content">
          <div className="card">
            <img className="card_logo" src={PDF2EXCEL} />
            <div className="card_content">PDF转Excel</div>
          </div>

          <div className="card">
            <img className="card_logo" src={PDF} />
            <div className="card_content">合并PDF</div>
          </div>

          <div className="card">
            <img className="card_logo" src={JPG2PDF} />
            <div className="card_content">JPG转PDF</div>
          </div>

          <div className="card">
            <img className="card_logo" src={PDF} />
            <div className="card_content">分割PDF</div>
          </div>
        </div>
      </div>
    </div>
  );
}
