import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import LogoImg from "../../assets/img/logo/logo.png";

function Logo() {
  return (
    <Link to="/">
      <img src={LogoImg} alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
