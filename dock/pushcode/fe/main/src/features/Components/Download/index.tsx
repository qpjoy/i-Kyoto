import ArrowRight from "@/assets/img/arrow-right.svg";
import { CustomerContext } from "@/contexts/CustomerContext";
// import { download } from "@/utils";
import { useContext } from "react";

function Download({ style }: any) {
  // const _download = (e: any) => {
  //   e.preventDefault();
  //   download(
  //     "https://memoscard.com/downloads/PushCode%E6%8E%A8%E6%B5%81%E5%8A%A9%E6%89%8B%20Setup%202.10.2.exe"
  //   );
  // };

  const { setOpen } = useContext(CustomerContext);

  const contactService = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <div className="download">
      {/* <a
        className="use-download btn"
        style={{
          ...style,
        }}
        onClick={_download}
      >
        下载使用 <img src={ArrowRight} />
      </a> */}

      <a
        className="use-download btn"
        style={{
          ...style
        }}
        onClick={contactService}
      >
        联系我 <img src={ArrowRight} />
      </a>
    </div>
  );
}

export default Download;
