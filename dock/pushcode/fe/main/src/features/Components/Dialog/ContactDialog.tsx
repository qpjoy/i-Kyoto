import { Dialog } from "@mui/material";
import QYWX from "@/assets/pushcode/vx.png";
import { useContext } from "react";
import { CustomerContext } from "@/contexts/CustomerContext";

function ContactDialog() {
  const { open, setOpen } = useContext(CustomerContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      style={
        {
          // width: "50%",
        }
      }
    >
      <img
        src={QYWX}
        style={{
          margin: "0 auto",
          display: "block",
          width: "100%",
          height: "100%",
          maxWidth: "700px",
          maxHeight: "700px",
          objectFit: "contain",
          objectPosition: "center",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          border: "1px solid #ccc"
        }}
      />
    </Dialog>
  );
}

export default ContactDialog;
