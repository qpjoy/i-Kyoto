import { useSnackbar } from "notistack";

import { Box, Button, Checkbox, Typography, lighten } from "@mui/material";
import styles from "./Register.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { darken } from "@mui/material/styles";
import { useLandStore } from "@/store/slices/landSlice";
import { validateEmail } from "@/utils/reg";
import AgreementDialog from "@/components/Dialog/AgreementDialog";

export default function Register({ counter }: any) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register: { email, code, isAccept },
    setStatus,
    setRegisterIsAccept,
    setRegisterEmail,
    setRegisterCode,
    setRegisterTimer,

    getRegisterCode
  } = useLandStore();

  // const [isAccept, setIsAccept] = useState(true);

  const handleGetCode = async (e: any) => {
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
        message: "邮箱验证码格式错误",
        code: -3
      };
    }
    // const res = await dispatch(register({ email, code })).unwrap();
    if (e) {
      const codeRes: any = await getRegisterCode({ email });
      console.log(`[Getted Code]: `, e, codeRes);
      if (codeRes.code === 0) {
        // dispatch(setTimer(60));
        if (!!codeRes.data?.code && codeRes.data.code != 0) {
          enqueueSnackbar(`验证码出现问题！${codeRes.data.message}`, {
            variant: "warning",
            vertical: "top",
            horizontal: "center"
          });
          return;
        }
        setRegisterTimer(60);
        enqueueSnackbar(`验证码已发送！${codeRes.data.content}`, {
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

  async function handleSubmit(e: any) {
    e.preventDefault();

    const getCodeRes: any = await handleGetCode(null);

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

    setStatus("register-next");
    // if (email && password) login(email, password);
  }

  const handleBack = (e) => {
    e && e.preventDefault();
    setStatus("login");
  };

  const handleToggleAccept = (event) => {
    const checked = !!event.target.checked;
    console.log(`[Handle accept]`, event.target.checked);
    setRegisterIsAccept(checked);
  };

  const agreeAcception = () => {
    // setIsAccept(true);
    setRegisterIsAccept(true);
    // dispatch(toggleAccept(true));
  };

  return (
    <main className={styles.register}>
      <Box
        sx={{
          display: "flex",
          position: "relative",
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
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.registertitle}>
              <a onClick={(e) => handleBack(e)}>
                <ChevronLeftIcon
                  sx={{
                    // position: "absolute",
                    color: "black",
                    fontSize: "3rem",
                    left: 0,
                    marginRight: "auto",
                    ":hover": {
                      cursor: "pointer",
                      color: "#3160ef"
                      // fontSize: "3.5rem"
                    }
                    // top: "-1rem"

                    // lineHeight: "6.5"
                    // height: "100%"
                    // left: -100
                  }}
                />
              </a>
              <Typography component="h1" variant="title" align="center" noWrap>
                欢迎注册
              </Typography>
            </div>

            <div className={styles.row}>
              <label className={styles.label} htmlFor="email">
                邮箱
              </label>
              <input
                className={styles.input}
                type="email"
                id="email"
                onChange={(e) => setRegisterEmail(e.target.value)}
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
                onChange={(e) => setRegisterCode(e.target.value)}
                value={code}
                style={{
                  minWidth: "unset",
                  width: "8rem",
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
                    backgroundColor: darken("#cde0f2", 0.4)
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
                control={<Checkbox checked={isAccept} onChange={handleToggleAccept} />}
                label="注册即表示同意"
                labelPlacement="end"
                sx={{
                  color: "black"
                }}
              /> */}
              <Checkbox checked={isAccept} onChange={handleToggleAccept} />
              <span
                style={{
                  color: "black",
                  fontSize: "1rem"
                }}
              >
                注册即表示同意
              </span>

              <AgreementDialog
                agree={agreeAcception}
                style={{
                  fontSize: "1rem",
                  color: "#315EE7",
                  cursor: "pointer"
                }}
              >
                服务条款
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
      </Box>
    </main>
  );
}
