import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  toggleAccept,
  setPasswordForgetEmail,
  setPasswordForgetCode,
  setForgetPasswordTimer,
  getIsAuthenticated,
  getPasswordCode
} from "../Account/accountSlice";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Button, Checkbox, FormControlLabel, Typography, darken, lighten } from "@mui/material";

import styles from "./ForgetPassword.module.css";
import { validateEmail } from "../../utils/reg";
import { enqueueSnackbar } from "notistack";
// import { useCountDown } from "../hooks/useCountdown";

export default function ForgetPassword({ counter }) {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState(useSelector((state) => state.account.forget.email) || "");

  const [code, setCode] = useState(useSelector((state) => state.account.forget.code) || "");

  const isAuthenticated = useSelector(getIsAuthenticated);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isAccept, setIsAccept] = useState(false);
  const isAccept2 = useSelector((state) => state.account.register.isAccept);

  // const timer = useSelector((state) => state.account.register.timer);

  const handleSetEmail = (event) => {
    console.log(`[event]: `, event.target.value);
    const email = event.target.value;
    setEmail(email);
    dispatch(setPasswordForgetEmail(email));
  };

  const handleSetCode = (event) => {
    const code = event.target.value;
    setCode(code);
    dispatch(setPasswordForgetCode(code));
  };

  const handleToggleAccept = (event) => {
    const checked = !!event.target.checked;
    console.log(`[Handle accept]`, event.target.checked);
    setIsAccept(checked);
    // toggleAccept(checked);
    dispatch(toggleAccept(checked));
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
      console.log(`[Getting Code]: `, e);
      const codeRes = await dispatch(getPasswordCode({ email })).unwrap();
      if (codeRes.code === 0) {
        dispatch(setForgetPasswordTimer(60));
        enqueueSnackbar(`验证码已发送！${codeRes.data.content}`, {
          variant: "success",
          vertical: "top",
          horizontal: "center"
        });
      } else {
        enqueueSnackbar(codeRes.message, {
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
    const getCodeRes = await handleGetCode();

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

    navigate("/forget-password-next");

    // if (email && password) login(email, password);
    // /forget-password-next
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
          <Link className={styles.center} component="a" to="/login">
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
                fontSize: 20,
                backgroundColor: "#315EE7",
                color: "white",
                ":hover": {
                  backgroundColor: "#2483e2"
                },
                ":disabled": {
                  color: "white"
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
                ":hover": {
                  backgroundColor: "#2483e2"
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
