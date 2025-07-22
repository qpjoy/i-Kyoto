import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { useLandStore } from "@/store/slices/landSlice";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Button, Checkbox, FormControlLabel, Typography, darken, lighten } from "@mui/material";

import styles from "./ForgetPassword.module.css";
import { validateEmail } from "../../utils/reg";
import { enqueueSnackbar } from "notistack";
// import { useCountDown } from "../hooks/useCountdown";

export default function ForgetPassword({ counter }: any) {
  const {
    forget: { email, code },
    setForgetEmail,
    setForgetCode,
    setForgetTimer,
    // getIsAuthenticated,
    // getPasswordCode
    setStatus,
    getForgetCode
  } = useLandStore();

  // const isAuthenticated = useSelector(getIsAuthenticated);
  const navigate = useNavigate();

  // const timer = useSelector((state) => state.account.register.timer);

  const handleSetEmail = (event: any) => {
    console.log(`[event]: `, event.target.value);
    const email = event.target.value;
    // setEmail(email);
    setForgetEmail(email);
    // dispatch(setPasswordForgetEmail(email));
  };

  const handleSetCode = (event: any) => {
    const code = event.target.value;
    setForgetCode(code);
  };

  const handleGetCode = async (e) => {
    e && e.preventDefault();
    if (!email) {
      enqueueSnackbar("请输入邮箱", {
        variant: "warning",
        vertical: "top",
        horizontal: "center"
      });
      return {
        message: "请输入邮箱",
        code: -1
      };
    }

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      enqueueSnackbar("邮箱格式错误", {
        variant: "warning",
        vertical: "top",
        horizontal: "center"
      });

      return {
        message: "邮箱格式错误",
        code: -2
      };
    }

    if (e) {
      const codeRes = await getForgetCode({ email });
      console.log(`[Getting Code]: `, codeRes);
      if (codeRes.code === 0) {
        // dispatch(setForgetPasswordTimer(60));
        setForgetTimer(60);
        enqueueSnackbar(`验证码已发送！${codeRes.data.content}`, {
          variant: "success",
          vertical: "top",
          horizontal: "center"
        });
      } else {
        enqueueSnackbar(codeRes.msg, {
          variant: "warning",
          vertical: "top",
          horizontal: "center"
        });
      }
    }

    // setIsGettingCode(true);
    // dispatch(setForgetPasswordTimer(60));
    // start();
    return {
      code: 0,
      message: "GoTo Next page!"
    };
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const getCodeRes = await handleGetCode(null);

    if (getCodeRes.code < 0) return;

    if (!code) {
      enqueueSnackbar("请输入验证码", {
        variant: "warning",
        vertical: "top",
        horizontal: "center"
      });
      return {
        message: "请输入验证码",
        code: -5
      };
    }

    setStatus("forget-next");

    // if (email && password) login(email, password);
    // /forget-password-next
  }

  function handleBack() {
    setStatus("login");
  }

  return (
    <main className={styles.register}>
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
          <a className={styles.center} onClick={() => handleBack()}>
            <ChevronLeftIcon
              sx={{
                position: "absolute",
                color: "black",
                fontSize: "50px",
                height: "100%",
                left: -100
              }}
            />
          </a>
          <Typography component="h1" variant="title" align="center" noWrap>
            找回密码
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
              onChange={handleSetEmail}
              value={email}
              placeholder="请输入邮箱"
            />
          </div>

          <div
            className={styles.row}
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <input
              className={styles.input}
              type="text"
              id="code"
              onChange={(e) => handleSetCode(e)}
              value={code}
              style={{
                minWidth: "unset",
                width: "20rem",
                height: "3.2rem"
              }}
              placeholder="请输入验证码"
            />

            <Button
              variant="login"
              fullWidth
              className={styles.button}
              type="primary"
              sx={{
                width: "100%",
                height: 50,
                fontSize: 16,
                backgroundColor: "#315EE7",
                color: "white",
                ":hover": {
                  backgroundColor: "#2483e2"
                },
                ":disabled": {
                  color: "white",
                  backgroundColor: darken("#2483e2", 0.4)
                }
              }}
              disabled={!!counter}
              onClick={handleGetCode}
            >
              {!counter ? "获取验证码" : `${counter}s后重新获取`}
            </Button>
          </div>

          <div>
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
                color: "white",
                ":hover": {
                  backgroundColor: "#2483e2"
                },
                ":disabled": {
                  color: "white",
                  backgroundColor: darken("#2483e2", 0.4)
                }
              }}
            >
              下一步
            </Button>
          </div>
        </form>
      </Box>
    </main>
  );
}
