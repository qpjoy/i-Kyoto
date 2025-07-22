import { Link } from "react-router";
import "./Header.scss";
import LOGO from "@/assets/pdftools.png";
import LandPopup from "@/features/Land/Land";
import { useCountDown } from "@/utils/hooks/useCountdown";
import { useForgetCountdown } from "@/utils/hooks/useForgetCountdown";
export default function Header() {
  const registerCounter = useCountDown()[0];
  const forgetCounter = useForgetCountdown()[0];

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

          <LandPopup registerCounter={registerCounter} forgetCounter={forgetCounter} />
        </ul>
      </nav>
    </header>
  );
}
