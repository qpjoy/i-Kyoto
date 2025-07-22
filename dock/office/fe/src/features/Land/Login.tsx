import React from "react";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import { useLandStore } from "@/store/slices/landSlice";
import { validateEmail } from "@/utils/reg";

const Login = ({ handleClose }: any) => {
  const {
    login: { email, password },
    setName,
    setStatus,
    setLoginEmail,
    setLoginPassword,
    loginWithEmail
  } = useLandStore();

  const { enqueueSnackbar } = useSnackbar();

  console.log(`[email, password]: `, email, password);

  const handleEmail = (e) => {
    console.log(`[e]: `, e);
    setLoginEmail(e.target.value);
  };

  const handlePassword = (e) => {
    console.log(`[e]: `, e);
    setLoginPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return enqueueSnackbar("请输入邮箱和密码", {
        variant: "warning",
        vertical: "top",
        horizontal: "center"
      });
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

    console.log(`In handle submit`);
    if (email && password) {
      const res = await loginWithEmail({ email, password });
      console.log(`[Res]: dispatch login `, res);
      if (res.code === 0) {
        // navigate("/app/account");
        enqueueSnackbar("登录成功！欢迎您！", {
          variant: "success",
          vertical: "top",
          horizontal: "center"
        });

        setStatus("login");
        const name = email.split("@")[0];
        setName(name);
        handleClose();
      } else {
        enqueueSnackbar("账号或密码错误", {
          variant: "warning",
          vertical: "top",
          horizontal: "center"
        });
      }
    }
  };

  return (
    <div className="login">
      <div className="login-title">账号登录</div>

      <div className="login-form">
        <TextField
          required
          id="outlined-required"
          label="邮箱"
          fullWidth={true}
          value={email}
          onChange={handleEmail}
        />
        <TextField
          required
          id="outlined-password-input"
          label="密码"
          type="password"
          autoComplete="current-password"
          fullWidth={true}
          value={password}
          onChange={handlePassword}
        />
        <div className="login-action" onClick={() => setStatus("forget")}>
          <span>忘记密码</span>
        </div>

        <Button variant="contained" color="success" fullWidth={true} onClick={handleLogin}>
          登录
        </Button>
      </div>

      <div className="go-register" onClick={() => setStatus("register")}>
        注册新账号
      </div>
    </div>
  );
};

export default Login;
