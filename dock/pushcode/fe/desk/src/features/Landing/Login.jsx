import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Button, Typography, darken, lighten } from "@mui/material";
import PasswordInput from "@/components/Input/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthenticated, login } from "@/features/Account/accountSlice";

import styles from "./Login.module.css";
import { useSnackbar } from "notistack";
import { getDeviceID } from "../Account/accountSlice";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState(useSelector((state) => state.account.login.email) || "");
  const [password, setPassword] = useState(useSelector((state) => state.account.login.password) || "");
  // const login
  const isAuthenticated = useSelector(getIsAuthenticated);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deviceID = useSelector(getDeviceID);

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return enqueueSnackbar("请输入邮箱和密码", {
        variant: "warning",
        vertical: "top",
        horizontal: "center"
      });
    }

    console.log(`In handle submit`);
    if (email && password) {
      const res = await dispatch(login({ email, password, deviceID })).unwrap();
      console.log(`[Res]: dispatch login `, res);
      if (res.statusCode === 200) {
        navigate("/app/account");
        enqueueSnackbar("欢迎！", {
          variant: "success",
          vertical: "top",
          horizontal: "center"
        });
      } else if (res.statusCode === 400) {
        enqueueSnackbar("账号或密码错误", {
          variant: "warning",
          vertical: "top",
          horizontal: "center"
        });
      }
    }
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%"
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "relative"
          }}
        >
          <Link className={styles.center} component="a" to="/">
            <ChevronLeftIcon
              sx={{
                position: "absolute",
                color: "black",
                fontSize: "50px",
                height: "100%",
                left: -100
              }}
            />
          </Link>
          <Typography component="h1" variant="title" align="center" noWrap>
            欢迎使用PushCode
          </Typography>
        </Box>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="email">
              邮箱
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="password">
              密码
            </label>
            <Link to="/forget-password">
              <span className={styles.span}>忘记密码</span>
            </Link>

            {/* <input
            className={styles.input}
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          /> */}
            <PasswordInput password={password} handlePassword={(e) => setPassword(e.target.value)} />
          </div>

          <div>
            {/* <Link to="/app/account"> */}
            <Button
              variant="login"
              fullWidth
              className={styles.button}
              type="primary"
              sx={{
                width: "100%",
                height: 50,
                fontSize: 20,
                backgroundColor: "#315EE7",
                ":hover": {
                  backgroundColor: "#2483e2"
                }
              }}
            >
              登录
            </Button>
            {/* </Link> */}
          </div>
        </form>
      </Box>
    </main>
  );
}
