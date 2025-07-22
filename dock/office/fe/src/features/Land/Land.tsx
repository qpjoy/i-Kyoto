import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Close from "@/ui/icons/close";

import Modal from "@mui/material/Modal";
import Login from "./Login";
import "./Land.scss";
import Register from "./Register";
import { useLandStore } from "@/store/slices/landSlice";
import RegisterNext from "./RegisterNext";
import Forget from "./ForgetPassword";
import AccountMenu from "@/components/Menu/AccountMenu";
import ForgetNext from "./ForgetPasswordNext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "40vw",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 4,
  p: 4
};

function LandPopup({ registerCounter, forgetCounter }: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { name, status } = useLandStore();

  return (
    <div>
      {name ? (
        <>
          <AccountMenu name={name} />
        </>
      ) : (
        <Button onClick={handleOpen}>登录</Button>
      )}

      <Modal
        open={open}
        onClose={(event, reason) => {
          // prevent closing on backdrop click or ESC key
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }
          console.log(`[event]: `, event);
          setOpen(false); // allow programmatic closing only
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Close
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 0,
              fontSize: "2.5rem",
              right: 0,
              ":hover": {
                color: "red"
              }
            }}
          />
          {status === "register" ? (
            <Register counter={registerCounter} />
          ) : status === "register-next" ? (
            <RegisterNext handleClose={handleClose} />
          ) : status === "login" ? (
            <Login handleClose={handleClose} />
          ) : status === "forget" ? (
            <Forget counter={forgetCounter} />
          ) : status === "forget-next" ? (
            <ForgetNext />
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}

export default LandPopup;
