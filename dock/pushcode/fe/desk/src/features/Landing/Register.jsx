import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  toggleAccept,
  setRegisterEmail,
  setRegisterCode,
  setRegisterCodeDisabled,
  setTimer
} from "@/features/Account/accountSlice";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Button, Checkbox, Typography } from "@mui/material";

import styles from "./Register.module.css";
import { getDeviceID, getIsAuthenticated, getRegisterCode, register } from "../Account/accountSlice";
import { useSnackbar } from "notistack";
import { validateEmail } from "../../utils/reg";
import AgreementDialog from "../../components/Dialog/AgreementDialog";

export default function Register({ counter }) {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState(useSelector((state) => state.account.register.email) || "");

  const [code, setCode] = useState(useSelector((state) => state.account.register.code) || "");

  const isDisabled = useSelector((state) => state.account.register.isDisabled) || false;

  const isAuthenticated = useSelector(getIsAuthenticated);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deviceID = useSelector(getDeviceID);
  const { enqueueSnackbar } = useSnackbar();

  const [isAccept, setIsAccept] = useState(false);
  const isAccept2 = useSelector((state) => state.account.register.isAccept);

  // const timer = useSelector((state) => state.account.register.timer);

  const handleSetEmail = (event) => {
    const email = event.target.value;
    setEmail(email);
    dispatch(setRegisterEmail(email));
  };

  const handleSetCode = (event) => {
    const code = event.target.value;
    setCode(code);
    dispatch(setRegisterCode(code));
  };

  const handleToggleAccept = (event) => {
    const checked = !!event.target.checked;
    console.log(`[Handle accept]`, event.target.checked);
    setIsAccept(checked);
    // toggleAccept(checked);
    dispatch(toggleAccept(checked));
  };

  const agreeAcception = () => {
    setIsAccept(true);
    dispatch(toggleAccept(true));
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
    console.log(`[isEmailValid]: `, isEmailValid);
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

    const isCodeValid = true;
    if (!isCodeValid) {
      return {
        message: "邮箱格式错误",
        code: -3
      };
    }
    // const res = await dispatch(register({ email, code })).unwrap();
    if (e) {
      const codeRes = await dispatch(getRegisterCode({ email, deviceID })).unwrap();
      console.log(`[Getting Code]: `, e, codeRes);
      if (codeRes.code === 0) {
        dispatch(setTimer(60));
        enqueueSnackbar("验证码已发送！", {
          variant: "success",
          vertical: "top",
          horizontal: "center"
        });
      } else {
        enqueueSnackbar(`${codeRes.message}`, {
          variant: "warning",
          vertical: "top",
          horizontal: "center"
        });
      }
    }

    return {
      code: 0,
      message: "GoTo Next page!"
    };
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const getCodeRes = await handleGetCode();

    console.log(`[Console]: `, getCodeRes);

    if (getCodeRes.code < 0) {
      return;
    }

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

    if (!isAccept) {
      enqueueSnackbar("请先同意服务条款", {
        variant: "warning",
        vertical: "top",
        horizontal: "center"
      });
      return {
        code: -4,
        message: "用户同意协议"
      };
    }

    navigate("/register-next");

    // if (email && password) login(email, password);
  }

  // useEffect(() => {
  //   console.log(timer, isDisabled);
  //   if (!timer) return;
  //   // if (!isGettingCode) return;
  //   const t = setTimeout(() => {
  //     console.log(`timer`, timer);
  //     if (!timer) {
  //       clearTimeout(t);
  //       dispatch(setRegisterCodeDisabled(false));
  //     } else {
  //       // const timer = timer - 1;
  //       dispatch(setTimer(timer - 1));
  //       clearTimeout(t);
  //     }
  //   }, 1000);
  // }, [timer, isDisabled]);

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

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
            欢迎注册
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

          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            {/* <FormControlLabel
              value="end"
              control={
                <Checkbox checked={isAccept} onChange={handleToggleAccept} />
              }
              label="注册即表示同意"
              labelPlacement="end"
              sx={{
                color: "black",
              }}
            /> */}
            <Checkbox checked={isAccept} onChange={handleToggleAccept} />
            <span
              style={{
                color: "black"
              }}
            >
              注册即表示同意
            </span>

            <AgreementDialog agree={agreeAcception}>
              <span
                style={{
                  fontSize: "1rem",
                  color: "#315EE7",
                  cursor: "pointer"
                }}
              >
                服务条款
              </span>
            </AgreementDialog>
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
