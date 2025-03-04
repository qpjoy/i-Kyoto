import React, { useEffect, useState } from "react";

import styles from "./ForgetPasswordNext.module.css";
import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PasswordInput from "../../components/Input/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { changePassword, getIsAuthenticated } from "../Account/accountSlice";
// import { forgetPassword } from "../../../../../be/src/utils/services/mail";

const ForgetPasswordNext = () => {
  const [password, setPassword] = useState(useSelector((state) => state.account.forget.password) || "");
  const [password2, setPassword2] = useState(useSelector((state) => state.account.forget.password2) || "");

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const email = useSelector((state) => state.account.forget.email);
  const code = useSelector((state) => state.account.forget.code);

  const isAuthenticated = useSelector(getIsAuthenticated);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password || !password2 || password !== password2) {
      enqueueSnackbar("两次密码不匹配!", {
        variant: "warning",
        vertical: "top",
        horizontal: "center"
      });
      return {
        code: -6,
        message: "两次密码不匹配!"
      };
    }

    if (email && password) {
      const res = await dispatch(
        changePassword({
          email,
          password,
          code
        })
      ).unwrap();

      if (res.statusCode === 201) {
        if (res.data.token) {
          enqueueSnackbar("密码修改成功！请登录。", {
            variant: "success",
            vertical: "top",
            horizontal: "center"
          });
          navigate("/login");
        } else {
          console.log(`[Verified]: `, res.data);
          enqueueSnackbar(res.data.message, {
            variant: "warning",
            vertical: "top",
            horizontal: "center"
          });
        }
      } else {
        console.log(`[ForgetPassword]: error `, res.message);
        enqueueSnackbar("注册失败", {
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
    <main className={styles.forgetPasswordNext}>
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
          <Link className={styles.center} component="a" to="/forget-password">
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
            <label className={styles.label} htmlFor="password">
              请输入密码
            </label>
            <PasswordInput password={password} handlePassword={(e) => setPassword(e.target.value)} />
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="password2">
              请再次输入密码
            </label>
            {/* <span className={styles.span}>忘记密码</span> */}
            {/* <input
            className={styles.input}
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          /> */}
            <PasswordInput password={password2} handlePassword={(e) => setPassword2(e.target.value)} />
          </div>

          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            className=""
          >
            <FormControlLabel
              value="end"
              control={<Checkbox />}
              label="注册即表示同意"
              labelPlacement="end"
              sx={{
                color: "black",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
                color: "#315EE7",
              }}
            >
              服务条款
            </span>
          </div> */}

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
              // onClick={handleRegister}
            >
              提交
            </Button>
          </div>
        </form>
      </Box>
    </main>
  );
};

export default ForgetPasswordNext;
