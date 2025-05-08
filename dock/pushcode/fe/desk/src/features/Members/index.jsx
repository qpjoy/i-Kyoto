import { Box, Typography } from "@mui/material";
import React from "react";

// import QYVX from "@/assets/img/contact/qyvx.jpeg";
import VX from "@/assets/img/contact/vx.png";

import "./Members.css";
import { useSelector } from "react-redux";
import { getExpiredAt } from "../Account/accountSlice";

const Members = () => {
  const expiredAt = useSelector(getExpiredAt);

  return (
    <Box
      className="members"
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "flex-start",
        justifyContent: "flex-start",
        height: "100%"
      }}
    >
      <Typography
        component="h6"
        variant="h6"
        // color="inherit"
        noWrap
        // sx={{ marginBottom: 1 }}
      >
        会员截止时间
      </Typography>
      <Typography
        // component="h7"
        // variant="h7"
        color="var(--color-content)"
        noWrap
        sx={{
          fontSize: "1.2rem",
          // paddingTop: ".4rem",
          color: "#9d9d9d"
          // fontSize: "1rem",
        }}
      >
        {expiredAt || "已过期"}
      </Typography>

      {/* <Typography
        component="h6"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ margin: "1rem 0 1rem 0" }}
      >
        客服微信 */}
      <Typography
        // component="h7"
        // variant="h7"
        color="var(--color-content)"
        noWrap
        sx={{ margin: "1rem 0", fontSize: "1rem", display: "inline" }}
      >
        延长会员时间请扫码添加客服微信
      </Typography>
      {/* </Typography> */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <img
          style={{
            width: "20rem"
            // maxWidth: "40%",
          }}
          src={VX}
          alt={"微信"}
          // loading="lazy"
        />
      </Box>
    </Box>
  );
};

export default Members;
