import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageNav from "@/features/Nav/PageNav";

import styles from "./Homepage.module.css";
import { Box, Button, CssBaseline, Typography } from "@mui/material";
import { getIsAuthenticated, verifyToken, setIsAuthenticated } from "../Account/accountSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Homepage() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app/account", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  useEffect(() => {
    console.log(`[Once Homepage]`);
    (async () => {
      const tokenRes = await dispatch(verifyToken()).unwrap();
      if (tokenRes.code === 0) {
        const { member } = tokenRes.data;
        dispatch(setIsAuthenticated(true));
        console.log(`[Homepage]: authenticated`, member);
      } else {
        console.log(`[Homepage]: not authenticated`);
      }
    })();
  }, []);

  return (
    <main className={styles.homepage}>
      <PageNav />

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
        <Typography component="h1" variant="title" align="center" noWrap>
          欢迎使用PushCode
        </Typography>

        <Button
          variant="outlined"
          color="orange"
          sx={{
            outline: "red",
            margin: "80px auto",
            fontSize: 18,
            color: "orange"
          }}
        >
          <Link to="login">已有账号，请登录</Link>
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <Typography
            // component="h6"
            variant="title"
            align="center"
            sx={{
              fontSize: 14,
              color: "var(--color-brand--2)"
            }}
          >
            新用户，请
          </Typography>

          <Button
            variant="text"
            color="orange"
            sx={{
              fontSize: 16,
              lineHeight: 1,
              margin: 0,
              padding: 0,
              // paddingBottom: ,
              minWidth: 10,
              ":hover": {
                cursor: "pointer",
                textDecoration: "underline"
              }
            }}
          >
            <Link to="register">注册</Link>
          </Button>
        </Box>
      </Box>
    </main>
  );
}
