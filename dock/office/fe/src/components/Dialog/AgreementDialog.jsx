import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AgreementDialog({ agree, children, style }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    agree();
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <span onClick={handleClickOpen("paper")} style={style}>
        {children}
      </span>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">服务条款</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            {`欢迎您注册并使用我们的产品（以下简称“本产品”）。在您注册成为本产品用户之前，请仔细阅读以下服务条款。注册并使用本产品将视为您同意遵守以下规定。
                账户注册
                1. 用户资格：您必须年满18周岁，或在法定年龄内具有完全民事权利和行为能力，方可注册使用本产品。
                2. 注册信息：在注册过程中，您需提供真实、准确、完整的个人信息。如有变更，应及时更新注册信息。
                用户行为规范
                1. 合法使用：您承诺合法、稳健地使用本产品，不得利用本产品从事任何违法、侵权或损害他人合法权益的行为。
                2. 安全保密：您负有妥善保管账户和密码的责任，不得将其透露给他人，如因您的保管不善而导致的一切后果，由您承担。
                3. 不当行为：您不得从事以下行为：
                  - 恶意攻击、侵入、破坏本产品系统；
                  - 利用漏洞、缺陷等非法手段获取不当利益；
                  - 散布虚假信息，侮辱、诽谤、侵犯他人权益。
                隐私保护
                1. 隐私政策：本产品将严格按照相关法律法规和隐私政策保护您的个人隐私信息，详见隐私政策。
                服务变更与终止
                1. 服务变更：本产品有权根据实际情况变更、暂停或终止部分或全部服务，并将尽力提前通知用户。
                2. 用户终止：用户可随时终止使用本产品，但需履行已存在的合同义务，其在终止前的行为仍需承担相应责任。
                免责声明
                1. 服务风险：用户理解并同意使用本产品所存在的风险，一切后果由用户自行承担。
                2. 不可抗力：对于因不可抗力事件导致的服务中断、数据丢失等，本产品不承担责任，但将尽力减少因此给用户造成的损失。
                其他条款
                1. 法律适用：本服务条款受中华人民共和国法律管辖。
                2. 纠纷解决：用户与本产品之间因服务使用产生的争议应友好协商解决，协商不成的，提交有管辖权的法院解决。
                接受条款
                用户在注册使用本产品时，即视为已仔细阅读并同意遵守本服务条款的所有规定。如果用户不同意本条款的任何内容，请停止注册并停止使用本产品。`
              .split("\n")
              .map((line, idx) => (
                <span style={{ display: "block" }} key={idx}>
                  {line}
                </span>
              ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleAgree}>继续</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
