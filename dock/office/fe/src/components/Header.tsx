import { Link } from "react-router";
import "./Header.scss";
import LOGO from "@/assets/pdftools.png";
export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <Link to="/">
            <img src={LOGO} alt="logo" />
          </Link>

          <li>
            <Link to="/#">所有产品</Link>
          </li>

          <li className="contact">
            <Link to="/about">联系我</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
