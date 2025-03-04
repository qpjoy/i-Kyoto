import { download } from "@/utils";
import { useNavigate } from "react-router-dom";

function MenuList({ hyper_link, link_name, setMenuActive }: any) {
  const navigate = useNavigate();

  const removeMenu = (e: any) => {
    // alert(`${hyper_link} - ${link_name}`);
    // e.preventDefault();

    if (link_name === "下载") {
      // navigate("//#download");
      e.preventDefault();
      download(
        "https://memoscard.com/downloads/PushCode%E6%8E%A8%E6%B5%81%E5%8A%A9%E6%89%8B%20Setup%202.10.2.exe"
      );
    } else if (link_name === "使用教程") {
      e.preventDefault();
      navigate("//tutor");
    } else if (link_name === "首页") {
      navigate("//#/home");
    } else if (link_name === "会员中心") {
      navigate("//#members");
    }
    setMenuActive(false);
  };

  return (
    <li onClick={removeMenu}>
      <a href={`${hyper_link}`}>{link_name}</a>
    </li>
  );
}

export default MenuList;
