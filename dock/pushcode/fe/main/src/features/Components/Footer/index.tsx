import "./Footer.scss";

function Footer() {
  return (
    <footer>
      <p className="footer_title">PushCode推流助手</p>

      <div className="footer_link">
        <span>软件许可协议</span>
        <span>隐私条款</span>
        <span>联系我</span>
      </div>

      <p className="copy_right">
        &#169; 2023-2025 PushCode 版权所有{" "}
        <a href="https://beian.miit.gov.cn/" target="_blank">
          沪ICP备2023029346号
        </a>
      </p>
    </footer>
  );
}

export default Footer;
