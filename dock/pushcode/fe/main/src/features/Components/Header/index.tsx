import { useEffect, useState } from "react";
import MenuList from "./MenuList";
import MenuLink from "./MenuLink.js";
import "./Header.scss";

// Icons
import { TbMenuDeep } from "react-icons/tb";

function Header() {
  const [isMenuActive, setMenuActive] = useState(false);

  const toggleActive = () => {
    setMenuActive(!isMenuActive);
  };

  useEffect(() => {
    const menu: any = document.getElementById("menu");
    var allLi = menu.querySelectorAll("li");

    function linkAction() {
      //Active Link
      allLi.forEach((n: any) => n.classList.remove("active"));
      this.classList.add("active");
    }

    allLi.forEach((n: any) => n.addEventListener("click", linkAction));
  });

  return (
    <header>
      <nav className="nav bd_grid">
        <a href="/pushcode/" className="nav_logo">
          PushCode推流助手
        </a>

        <ul className={isMenuActive ? "show" : ""} id="menu">
          {MenuLink &&
            MenuLink.map((menuData) => (
              <MenuList
                key={menuData.id}
                hyper_link={menuData.hyper_link}
                link_name={menuData.link_name}
                setMenuActive={setMenuActive}
              />
            ))}
        </ul>

        <i className="toggleMenu" onClick={toggleActive}>
          <TbMenuDeep />
        </i>
      </nav>
    </header>
  );
}

export default Header;
