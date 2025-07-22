import styles from "./RegisterNext.module.css";
import { Box, Button, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router";
import PasswordInput from "@/components/Input/PasswordInput";
import { useSnackbar } from "notistack";
import { useLandStore } from "@/store/slices/landSlice";

const RegisterNext = ({ handleClose }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register: { email, code, password, password2 },
    setName,
    setStatus,
    registerWithEmail,
    setRegisterPassword,
    setRegisterPassword2
  } = useLandStore();

  const navigate = useNavigate();

  async function handleSubmit(e: any) {
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
    console.log(email, password);

    if (email && password) {
      // const res = await dispatch(
      //   register({
      //     email,
      //     password,
      //     code,
      //     deviceID
      //   })
      // ).unwrap();
      const res = await registerWithEmail({
        email,
        password,
        code
      });
      console.log(`[Register Email]: `, res);

      if (res.code === 0) {
        if (res.data.token) {
          enqueueSnackbar("注册成功！", {
            variant: "success",
            vertical: "top",
            horizontal: "center"
          });
          setStatus("login");
          const name = email.split("@")[0];
          setName(name);
          handleClose();
        } else {
          console.log(`[Verified]: `, res.data);
          enqueueSnackbar(res.data.msg, {
            variant: "warning",
            vertical: "top",
            horizontal: "center"
          });
        }
      } else {
        console.log(`[Register]: error `, res.msg);
        enqueueSnackbar(res.message, {
          variant: "warning",
          vertical: "top",
          horizontal: "center"
          // autoHideDuration: 10000
        });
      }
    }
  }

  function handleBack() {
    setStatus("register");
  }

  return (
    <main className={styles.registerNext}>
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
          <a className={styles.center} onClick={handleBack}>
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
            设置密码
          </Typography>
        </Box>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="password">
              请输入密码
            </label>
            <PasswordInput password={password} handlePassword={(e) => setRegisterPassword(e.target.value)} />
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
            <PasswordInput
              password={password2}
              handlePassword={(e: any) => setRegisterPassword2(e.target.value)}
            />
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
              // onClick={handleRegister}
            >
              注册
            </Button>
          </div>
        </form>
      </Box>
    </main>
  );
};

export default RegisterNext;
