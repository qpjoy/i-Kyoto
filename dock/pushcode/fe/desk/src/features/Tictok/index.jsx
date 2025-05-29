import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Switch
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { clipboard, ipcRenderer } from "electron";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNetwork,
  getNetworks,
  getServer,
  setNetwork as _setNetwork,
  setServer as _setServer,
  setNetworks as _setNetworks,
  setAutomation as _setAutomation,
  setObs,
  getObs,
  getAutomation
} from "./tictokSlice";
import { useSnackbar } from "notistack";

import useDeviceID from "../../hooks/useDeviceID";
import { getDevices, getIsExpired, getMaxDeviceNum, verifyToken } from "../Account/accountSlice";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5
      }
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff"
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3
    }
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500
    })
  }
}));

const Tictok = () => {
  const [isGenerating, setIsgenerating] = useState(false);
  const [network, setNetwork] = useState("");
  const _server = useSelector(getServer);
  const _obs = useSelector(getObs);
  const _automation = useSelector(getAutomation);
  console.log(`[_server]: `, _server);
  const [server, setServer] = useState({});
  const _networks = useSelector(getNetworks);
  console.log(`[_networks]: `, _networks);
  const [networks, setNetworks] = useState(_networks || []);

  const [automation, setAutomation] = useState(() => {
    return _automation || false;
  });

  const [deviceID] = useDeviceID();
  console.log(`[deviceID]: `, deviceID);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const maxDeviceNum = useSelector(getMaxDeviceNum);
  const isExpired = useSelector(getIsExpired);

  const devices = useSelector(getDevices);

  const handleNetworkChange = useCallback((event) => {
    const network = event.target.value;
    console.log(`[Network changed]: `, network);
    dispatch(_setNetwork(network));
    setNetwork(network);

    ipcRenderer.send("tictok:set-network", network);
  }, []);

  const handleNetworkOpen = useCallback((event) => {
    ipcRenderer.send("tictok:get-network-list", "go");
  }, []);

  const handleCopyUrl = (event) => {
    console.log(`[Tictok]: copying url`);
    // setNetwork(null);
    const { url } = server;
    if (url) {
      clipboard.writeText(url);
      enqueueSnackbar("服务器地址复制成功！", {
        variant: "success",
        vertical: "top",
        horizontal: "center"
      });
    }
  };

  const handleCopyToken = (event) => {
    console.log(`[Tictok]: copying token`);
    const { token } = server;
    if (token) {
      clipboard.writeText(token);
      enqueueSnackbar("服务器密钥复制成功！", {
        variant: "success",
        vertical: "top",
        horizontal: "center"
      });
    }
  };

  const handleLive = () => {
    console.log(`[Tictok]: live`, server);
    ipcRenderer.send(
      "obs:set-stream-setting",
      JSON.stringify({
        server: server.url,
        key: server.token,
        socketUrl: _obs.socketUrl,
        password: ""
      })
    );
  };

  const handleWebSocket = () => {
    console.log(`[WebSocket]: setting `);
    ipcRenderer.send("obs:set-websocket-setting", "go");
  };

  const handleAutomation = (e) => {
    const isAutomation = !automation;
    console.log(`[Automation]: `, isAutomation);
    setAutomation(isAutomation);
    dispatch(_setAutomation(isAutomation));

    if (isAutomation) {
      enqueueSnackbar("正在自动设置obs webServer，请不要操作耐心等待！如果10s后没有自动响应，请重试！", {
        variant: "warning",
        vertical: "top",
        horizontal: "center"
      });
      handleWebSocket();
    } else {
      // dispatch(_setAutomation(false));
    }

    // if(isAutomation) {
    //   handleWebSocket();
    // }
  };

  // const handleListenPushCode = () => {
  //   console.log(`[Tictok]: getting push code...`);
  //   ipcRenderer.send("tictok:get-network-list", "go");
  //   // window.tictok.getStreamCode();
  // };

  useEffect(() => {
    if (server.url && _automation) {
      ipcRenderer.send(
        "obs:set-stream-setting",
        JSON.stringify({
          server: server.url,
          key: server.token,
          socketUrl: _obs.socketUrl,
          password: ""
        })
      );
    }
  }, [server]);

  useEffect(() => {
    console.log(`[Once Tictok]`);
    (async () => {
      const tokenRes = await dispatch(verifyToken()).unwrap();
      if (tokenRes.code === 0) {
        const { member } = tokenRes.data;
        // dispatch(setIsAuthenticated(false));
        console.log(`[Tictok]: authenticated`, member);
      } else {
        console.log(`[Tictok]: not authenticated`);
      }
    })();
  }, []);

  useEffect(() => {
    ipcRenderer.on("tictok:got-network-list", (event, arg) => {
      console.log(`[tictok:got-network-list]: `, arg);
      dispatch(_setNetworks(arg));
      setNetworks(arg);
    });

    ipcRenderer.on("tictok:server", (event, arg) => {
      console.log(`[tictok:server]:  Got stream...`, arg);
      dispatch(_setServer(arg));
      setServer(arg);
      setIsgenerating(false);
    });

    ipcRenderer.on("tictok:server-generating", (event, arg) => {
      console.log(`[tictok:server-generating]: `, arg);
      setIsgenerating(true);
    });

    ipcRenderer.on("obs:got-obs-password", (event, arg) => {
      console.log(`[tictok:server-generating]: `, arg);
      enqueueSnackbar("OBS WebSocket信息设置成功！现在您可以一键开播啦！", {
        variant: "success",
        vertical: "top",
        horizontal: "center"
      });
      dispatch(setObs({ password: arg }));
      dispatch(_setAutomation(true));
    });

    ipcRenderer.on("live:one-click", (event, arg) => {
      console.log(`[live:one-click]: `, arg);
      try {
        const oneClickMessager = JSON.parse(arg);
        enqueueSnackbar(oneClickMessager.message || "一键直播出问题了！", {
          variant:
            oneClickMessager.code == -1 ? "error" : oneClickMessager.code == -2 ? "warning" : "success",
          vertical: "top",
          horizontal: "center"
        });
      } catch (e) {
        console.log(`[live:one-click]: err`, e);
      }
    });

    return () => {
      ipcRenderer.off("tictok:got-network-list", (event, arg) => {
        console.log(`[tictok:got-network-list]: off`, arg);
      });

      ipcRenderer.off("tictok:server", (event, arg) => {
        console.log(`[tictok:server]:  Got stream... off`, arg);
      });

      ipcRenderer.off("tictok:server-generating", (event, arg) => {
        console.log(`[tictok:server-generating]: off`, arg);
      });

      ipcRenderer.off("obs:got-obs-password", (event, arg) => {
        console.log(`[obs:got-obs-password]: off`, arg);
      });

      ipcRenderer.off("live:one-click", (event, arg) => {
        console.log(`[live:one-click]: off`, arg);
      });
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "flex-start",
        justifyContent: "flex-start",
        height: "100%"
      }}
    >
      <Typography
        component="h6"
        variant="h6"
        color="inherit"
        noWrap
        // sx={{ flexGrow: 1 }}
      >
        抖音 账户
      </Typography>

      {/* {devices?.length > maxDeviceNum ? (
        // devices.map((device) => device.content).indexOf(deviceID) < 0 ?
        <Typography
          // component="h7"
          // variant="h7"
          color="var(--color-content)"
          noWrap
          sx={{
            fontSize: "1.2rem",
            // paddingTop: ".4rem",
            color: "#9d9d9d"
            // fontSize: "1rem",
          }}
        >
          该账号已超过最大绑定设备数量，请联系客服购买后使用
        </Typography>
      ) : devices.map((device) => device.content).indexOf(deviceID) < 0 ? (
        <Typography
          // component="h7"
          // variant="h7"
          color="var(--color-content)"
          noWrap
          sx={{
            fontSize: "1.2rem",
            // paddingTop: ".4rem",
            color: "#9d9d9d"
            // fontSize: "1rem",
          }}
        >
          当前设备不在服务列表中，请联系客服购买后使用
        </Typography>
      ) : isExpired ? (
        <Typography
          // component="h7"
          // variant="h7"
          color="var(--color-content)"
          noWrap
          sx={{
            fontSize: "1.2rem",
            // paddingTop: ".4rem",
            color: "#9d9d9d"
            // fontSize: "1rem",
          }}
        >
          您的套餐计划已经过期，请联系客服！
        </Typography>
      ) : (
       
      )} */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "2rem"
        }}
      >
        <Box sx={{ minWidth: 420 }}>
          <FormControl fullWidth>
            <InputLabel id="network-label">请选择您的网卡</InputLabel>
            <Select
              labelId="network-label"
              id="network-select"
              value={network}
              label="Network"
              autoWidth={true}
              onChange={handleNetworkChange}
              onOpen={handleNetworkOpen}
              // onClose={handleNetworkChange}
            >
              {networks.map((network, idx) => {
                return (
                  <MenuItem key={`network_${idx}`} value={network.number}>
                    {network.wifi}
                  </MenuItem>
                );
              })}
              {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
            // flexDirection:
          }}
        >
          <Box
            sx={{
              m: "1rem 0",
              display: "flex",
              width: "80%",
              minWidth: "400px"
            }}
          >
            <Typography variant="h7" color="inherit" noWrap>
              服务器：
            </Typography>

            <Typography
              variant="h7"
              color="inherit"
              noWrap
              sx={{
                color: "#9d9d9d",
                ml: "1rem"
              }}
            >
              {isGenerating ? "正在生成中..." : server.url || ""}
            </Typography>
          </Box>

          <Button variant="outlined" size="small" onClick={handleCopyUrl}>
            复制
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
            // flexDirection:
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "80%",
              minWidth: "400px"
            }}
          >
            <Typography
              variant="h7"
              color="inherit"
              noWrap
              sx={{
                flexShrink: 0
              }}
            >
              串流密钥：
            </Typography>

            <Typography
              variant="h7"
              color="inherit"
              noWrap
              sx={{
                color: "#9d9d9d"
              }}
            >
              {isGenerating ? "正在生成中..." : server.token || ""}
            </Typography>
          </Box>

          <Button variant="outlined" size="small" onClick={handleCopyToken}>
            复制
          </Button>
        </Box>

        {/* <Button variant="outlined" size="small" onClick={handleWebSocket}>
            自动设置用户名密码（仅需一次）
          </Button> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "",
            // justifyContent: "space-between",
            // flexDirection:
            marginTop: "1rem"
          }}
        >
          <FormControlLabel
            control={
              <IOSSwitch
                sx={{ m: 1 }}
                // defaultChecked
                // value={"123"}
                checked={automation}
                onChange={handleAutomation}
              />
            }
            label="自动化流程"
          />
          <Typography
            // component="h7"
            // variant="h7"
            color="var(--color-content)"
            // noWrap
            sx={{
              fontSize: "1rem",
              // paddingTop: ".4rem",
              color: "#9d9d9d"
              // fontSize: "1rem",
            }}
          >
            开启后只需点击「直播伴侣-开始直播」，系统将自动启动OBS完成配置，并自动开播
          </Typography>
        </Box>

        <Box
          sx={{
            display: "none",
            flexDirection: "column",
            // alignItems: "",
            // justifyContent: "space-between",
            // flexDirection:
            marginTop: "2rem"
          }}
        >
          <Button
            sx={{
              width: "20rem"
            }}
            variant="outlined"
            size="small"
            onClick={handleLive}
            disabled={network && automation ? false : true}
          >
            一键直播
          </Button>

          <Typography
            // component="h7"
            // variant="h7"
            color="var(--color-content)"
            noWrap
            sx={{
              fontSize: "1rem",
              // paddingTop: ".4rem",
              color: "#9d9d9d"
              // fontSize: "1rem",
            }}
          >
            建议手动关闭直播伴侣和obs，一键开播
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Tictok;
