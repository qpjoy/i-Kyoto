import React, { Suspense, useEffect } from "react";
import {
  Routes,
  Route,
  HashRouter,
  Navigate,
  Link,
  RouterProvider,
  createHashRouter
} from "react-router-dom";

import { ThemeProvider, Typography, createTheme } from "@mui/material";

import { SnackbarProvider } from "notistack";

import SpinnerFullPage from "@/components/Loading/SpinnerFullPage";
import Homepage from "@/features/Landing/Homepage";
import Login from "@/features/Landing/Login";
import AppLayout from "./layouts/AppLayout";

import Account from "./features/Account";
import Tictok from "./features/Tictok";
import Members from "./features/Members";
import Messages from "./features/Messages";
import Help from "./features/Help";
import Register from "./features/Landing/Register";
import RegisterNext from "./features/Landing/RegisterNext";
import ForgetPassword from "./features/Landing/ForgetPassword";
import ForgetPasswordNext from "./features/Landing/ForgetPasswordNext";

import { useCountDown } from "./hooks/useCountdown";
import { useForgetPasswordCountdown } from "./hooks/useForgetPasswordCountdown";

import "@/assets/css/App.css";
import useDeviceID from "./hooks/useDeviceID";
import { ipcRenderer } from "electron";

const defaultTheme = createTheme({
  components: {
    variants: [
      {
        props: { size: "xl" },
        style: {
          fontSize: 50,
          padding: "4px 2px"
        }
      }
    ]
  },
  palette: {
    primary: {
      main: "#2483E2",
      light: "#e1e1e1",
      dark: "#2483E2",
      contrastText: "#2483E2"
    },
    orange: {
      main: "#FFA500",
      light: "#e1e1e1",
      dark: "#FFA500",
      contrastText: "#FFA500"
    },
    secondary: {
      main: "#2483E2",
      light: "#e1e1e1",
      dark: "#2483E2",
      contrastText: "#2483E2"
    },
    title: {
      default: "#fff",
      dark: "#000"
    },
    button: {
      main: "#2483E2",
      light: "#e1e1e1",
      dark: "#2483E2",
      contrastText: "#2483E2"
    }
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    title: {
      color: "black",
      fontSize: 32
    }
  }
});

function App() {
  const registerCounter = useCountDown()[0];
  const forgetPasswordCounter = useForgetPasswordCountdown()[0];

  const [deviceID] = useDeviceID();

  useEffect(() => {
    ipcRenderer.send("eat:device-id", "go");
  }, []);

  return (
    <div className="app">
      <ThemeProvider theme={defaultTheme}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={4000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <HashRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register counter={registerCounter} />} />
                <Route path="register-next" element={<RegisterNext />} />
                <Route path="forget-password" element={<ForgetPassword counter={forgetPasswordCounter} />} />
                <Route path="forget-password-next" element={<ForgetPasswordNext />} />

                <Route path="app" element={<AppLayout />}>
                  <Route index element={<Navigate replace to="app/account" />} />
                  <Route path="account" element={<Account />} />
                  <Route path="tictok" element={<Tictok />} />
                  <Route path="members" element={<Members />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="help" element={<Help />} />
                </Route>
              </Routes>
            </Suspense>
          </HashRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
