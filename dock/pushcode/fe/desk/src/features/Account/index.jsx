import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";

import styles from "./Account.module.css";
import { Link } from "react-router-dom";

import LogoutDialog from "../../components/Dialog/LogoutDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices, getDeviceID, getDevices, getMaxDeviceNum, getUser } from "./accountSlice";

const Account = () => {
  const devices = useSelector(getDevices);
  const maxDeviceNum = useSelector(getMaxDeviceNum);

  const dispatch = useDispatch();

  const deviceID = useSelector(getDeviceID);
  const user = useSelector(getUser);

  useEffect(() => {
    (async () => {
      await dispatch(fetchDevices({})).unwrap();
    })();
  }, []);

  return (
    // <div className={styles.account}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "flex-start",
        justifyContent: "flex-start",
        height: "100%"
      }}
    >
      <Typography component="h6" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0 }}>
        绑定邮箱
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
          // display: "none",
          // flexDirection:
        }}
      >
        <Typography
          // variant="h7"
          color="inherit"
          noWrap
          sx={{
            color: "#9d9d9d",
            fontSize: "1rem"
          }}
        >
          {user && user.email}
        </Typography>

        {/* <Button variant="outlined">修改</Button> */}
      </Box>

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
        {/* {devices.length} */}
        {/* {JSON.stringify(devices.map((device) => device.content) < 0)} */}
        {devices?.length > maxDeviceNum
          ? // devices.map((device) => device.content).indexOf(deviceID) < 0 ?
            "该账号已超过最大绑定设备数量，请联系客服购买后使用"
          : devices?.map((device) => device.content).indexOf(deviceID) < 0
            ? "当前设备不在服务列表中，请联系客服购买后使用"
            : ""}
      </Typography>

      <Typography component="h6" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0, marginTop: "1rem" }}>
        已绑定的设备({devices?.length} / {maxDeviceNum})
      </Typography>

      {devices?.map((device, idx) => {
        return (
          <Box
            key={`device-${idx}`}
            sx={{
              display: "flex",
              height: "2rem",
              alignItems: "center"
              // justifyContent: "center",
              // display: "none",
              // flexDirection:
            }}
          >
            <Typography component="h6" variant="h6" color="inherit" noWrap sx={{ fontSize: "1rem" }}>
              设备{`${idx + 1}`}：
            </Typography>

            <Typography
              // variant="h7"
              color="inherit"
              noWrap
              sx={{
                color: "#9d9d9d",
                fontSize: "1rem"
              }}
            >
              {device.content}
            </Typography>
          </Box>
        );
      })}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          mt: "auto"
          // flexDirection:
        }}
      >
        {/* <Button variant="outlined" onClick={handleLogout}>
          退出登录
        </Button> */}

        <LogoutDialog />
      </Box>
    </Box>
    // </div>
  );
};

export default Account;
