"use strict";

// Import parts of electron to use
const { app, BrowserWindow, ipcMain, shell, clipboard } = require("electron");
const os = require("os");
const path = require("path");
const url = require("url");
const { promisify } = require("util");
const { exec, fork } = require("child_process");
const execAsync = promisify(exec);
const { spawn } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs");

const xwin = require("@miniben90/x-win");

// const {
//   keyboard,
//   Key,
//   mouse,
//   screen,
//   straightTo,
//   centerOf,
//   left,
//   right,
//   up,
//   down,
// } = require("@nut-tree/nut-js");
// const robot = require("@hurdlegroup/robotjs");
const { mouse, left, right, up, down, Point, screen, Region, Button } = require("@nut-tree-fork/nut-js");
const { default: OBSWebSocket } = require("obs-websocket-js");

const Tesseract = require("tesseract.js");
const obs = new OBSWebSocket();

let wiresharkInstallPath = "";
let obsInstallPath = "";

// 获取当前操作系统的名称
const platform = os.platform();
let osType = "win";

// 判断操作系统类型
if (platform === "win32") {
  console.log("Windows 操作系统");
  osType = "win";
} else if (platform === "darwin") {
  console.log("macOS 操作系统");
  osType = "mac";
} else if (platform === "linux") {
  console.log("Linux 操作系统");
  osType = "linux";
} else {
  console.log("未知操作系统", platform);
  osType = "unkown";
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;

// Broken:
// if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
//   dev = true
// }
// app.disableHardwareAcceleration();

const user_path = app.getPath("home");
let appid_path = path.join(user_path, ".elappid");

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === "development") {
  dev = true;
}

const wireshark = require("./wireshark/index");
const wlan = require("./wireshark/wlan");

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      allowFileAccess: true,
      contextIsolation: false
      // preload: path.join(__dirname, "preload.js"),
      // devTools: true,
    },
    autoHideMenuBar: true
  });

  // and load the index.html of the app.
  let indexPath;

  if (dev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "build-html", "index.html"),
      slashes: true
    });
    // mainWindow.loadFile(indexPath);
  }

  mainWindow.loadURL(indexPath);

  // ipcMain.on("tictok:get-stream-code", async (event, arg) => {
  //   console.log(`[Tictok]: Main `, arg);

  //   const { number, list } = await wlan.getWlan();
  //   console.log(`网卡列表：`, list);
  //   console.log(`自动选择网卡编号:`, number);
  //   const result = await wireshark.capturePackets(number);
  //   console.log(`[推流码结果]: `, result);
  // });

  ipcMain.on("eat:device-id", async (event, arg) => {
    let deviceId = fs.readFileSync(appid_path, "utf8");
    console.log(`[deviceId]: eat:device-id `, deviceId);
    event.reply("ate:device-id", deviceId);
  });

  // tictok:set-network
  ipcMain.on("tictok:set-network", async (event, arg) => {
    console.log(`[Tictok]: Network Set `, arg);
    event.reply("tictok:server-generating", arg);
    try {
      await wireshark.stopCapture();
      await delay(1000);
      const result = await wireshark.capturePackets(
        osType === "win" ? { interface: arg, installPath: wiresharkInstallPath } : { interface: arg }
      );
      if (result?.code === 0) {
        console.log(`[Push code]: Res `, result);

        event.reply("tictok:server", result.data);
      } else {
      }
    } catch (e) {
      console.log(`[Tictok error]: set network and wait for server `, e);
    }
  });

  // function delay(ms, msg) {
  //   let timeoutId;
  //   const promise = new Promise((resolve, reject) => {
  //     timeoutId = setTimeout(resolve, ms);
  //   });

  //   promise.cancel = () => {
  //     if (msg) console.log(`[Delay]: ${msg} should be delayed, but canceled`);
  //     clearTimeout(timeoutId);
  //     timeoutId = null;
  //   };
  //   return promise;
  //   // return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // 下载地址：github.com/naptha/tessdata/blob/gh-pages/4.0.0_best/eng.traineddata.gz
  // 多语言识别
  async function performOCR(imagePath) {
    const worker = await Tesseract.createWorker("chi_sim", 3, {
      langPath: `http://localhost:9899/lang`
    });

    const result = await worker.recognize(imagePath);

    // console.log(result);
    await worker.terminate();
    return {
      text: result.data.text,
      boxes: result.data.words.map((word) => {
        return {
          text: word.text,
          box: word.bbox
        };
      })
    };
  }

  // async function performOCR(imagePath) {
  //   const result = await Tesseract.recognize(imagePath, 'eng', {
  //     langPath: `http://localhost:9899/lang`
  //   });
  //   return {
  //     text: result.data.text,
  //     boxes: result.data.words.map((word) => {
  //       return {
  //         text: word.text,
  //         box: word.bbox
  //       }
  //     })
  //   };
  // }

  async function ClickX(window) {
    const { x, y, width, height } = window.position;
    const abortObsPosition = {
      x: x + width - 15,
      y: y + 15
    };
    console.log(`[X window]: `, abortObsPosition);
    mouse.move(new Point(abortObsPosition.x, abortObsPosition.y));
    mouse.leftClick();
  }

  async function Click_(window) {
    const { x, y, width, height } = window.position;
    const minOBSPosition = {
      x: x + width - 110,
      y: y + 15
    };
    console.log(`[minOBSPosition]: `, minOBSPosition);
    mouse.move(new Point(minOBSPosition.x, minOBSPosition.y));
    mouse.leftClick();
  }

  async function startOBS() {
    // 等待obs启动
    const OBSObj = await checkOBSPath();
    if (!OBSObj) {
      console.log(`[OBS Reg]: path not found!`);
      throw Error("[OBS Reg]: path not found!");
    }
    if (!OBSObj.isSteam) {
      const paths = OBSObj.path.split("\\");

      await shell.openExternal(OBSObj.path, {
        workingDirectory: paths.slice(0, paths.length - 1).join("\\")
      });
    } else {
      await runPowerShellScript(
        path.join(__dirname, dev ? "./resources/start-obs-steam.ps1" : "../start-obs-steam.ps1")
      );
    }
    return OBSObj;
  }

  async function loadOBSMainWindow(timer = 18000) {
    // 主窗口加载完成
    let loopTimer = 0;
    let currentWindow = null;
    return new Promise(async (res, rej) => {
      do {
        await delay(2000);
        loopTimer += 2000;
        currentWindow = xwin.activeWindow();
        console.log(`[OBS MainWindow]:  detecting ${loopTimer / 1000}s...`, currentWindow);

        // 已经运行中窗口
        const isExistWindowLoaded = await checkIfWindowLoaded({
          title: "OBS 已在运行",
          title1: "running",
          window: currentWindow
        });
        // steam启动中窗口
        const isLaunchingWindowLoaded = await checkIfWindowLoaded({
          title: "启动中",
          window: currentWindow
        });

        const isOBSMainWindowLoaded = await checkIfWindowLoaded({
          title: "场景",
          title1: "scene",
          window: currentWindow
        });

        const isSecureWindowLoaded = await checkIfWindowLoaded({
          title: "安全模式",
          window: currentWindow
        });

        const isSteamLoginWindowLoaded = await checkIfWindowLoaded({
          title: "登录 Steam",
          window: currentWindow
        });

        if (isExistWindowLoaded) {
          // 继续操作
          const { x, y, width, height } = currentWindow.position;
          const continuePosition = {
            x: x + width - 100,
            y: y + height - 30
          };
          console.log(`[obsWindow]: `, continuePosition);
          mouse.move(new Point(continuePosition.x, continuePosition.y));
          mouse.leftClick();
        } else if (isLaunchingWindowLoaded) {
          console.log(`[Steam OBS]:  启动中${loopTimer}...`);
        } else if (isOBSMainWindowLoaded) {
          loopTimer = 100000;
          return res(currentWindow);
        } else if (isSecureWindowLoaded) {
          await ClickX(currentWindow);
        } else if (isSteamLoginWindowLoaded) {
          loopTimer = 100000;
          console.log(`steam 未登录，请重试！`);
          return rej({ code: -1, message: "steam 未登录，请重试！" });
        }
      } while (loopTimer < timer);
    });
  }

  async function ensureOBSStarted(timer = 18000) {
    // 主窗口加载完成
    let loopTimer = 0;
    let currentWindow = null;
    return new Promise(async (res, rej) => {
      do {
        await delay(2000);
        loopTimer += 2000;

        currentWindow = xwin.activeWindow();
        console.log(`[OBS MainWindow]:  ensuring ${loopTimer / 1000}s...`);

        // 已经运行中窗口
        const isExistWindowLoaded = await checkIfWindowLoaded({
          title: "OBS 已在运行",
          title1: "running",
          window: currentWindow
        });
        // steam启动中窗口
        const isLaunchingWindowLoaded = await checkIfWindowLoaded({
          title: "启动中",
          window: currentWindow
        });

        const isOBSMainWindowLoaded = await checkIfWindowLoaded({
          title: "场景",
          title1: "scene",
          window: currentWindow
        });

        const isSecureWindowLoaded = await checkIfWindowLoaded({
          title: "安全模式",
          window: currentWindow
        });

        const isSteamLoginWindowLoaded = await checkIfWindowLoaded({
          title: "登录 Steam",
          window: currentWindow
        });

        if (isExistWindowLoaded) {
          // 继续操作
          const { x, y, width, height } = currentWindow.position;
          const continuePosition = {
            x: x + width - 100,
            y: y + height - 30
          };
          console.log(`[obsWindow]: `, continuePosition);
          mouse.move(new Point(continuePosition.x, continuePosition.y));
          mouse.leftClick();
        } else if (isLaunchingWindowLoaded) {
          console.log(`[Steam OBS]:  启动中${loopTimer}...`);
        } else if (isOBSMainWindowLoaded) {
          await Click_(currentWindow);
          loopTimer = 100000;
          return res(currentWindow);
        } else if (isSecureWindowLoaded) {
          await ClickX(currentWindow);
        } else if (isSteamLoginWindowLoaded) {
          loopTimer = 100000;
          console.log(`steam 未登录，请重试！`);
          return rej({ code: -1, message: "steam 未登录，请重试！" });
        }
      } while (loopTimer < timer);
    });
  }

  async function checkIfWindowLoaded({ title, title1, window }) {
    const _window = window || xwin.activeWindow();

    if (_window.title.indexOf(title) >= 0 || (title1 ? _window.title.indexOf(title1) >= 0 : false)) {
      return true;
    } else {
      return false;
    }
  }
  // 一键直播
  // obs call events
  // https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md#events
  async function setOBSLive(params) {
    const { server, key, password, socketUrl = "ws://127.0.0.1:4455" } = params;
    try {
      // if (!password) {
      //   return {
      //     code: -1,
      //     message: "没有连上obs，请重新设置自动化流程",
      //   };
      // }
      const connectInfo = await obs.connect(socketUrl, "", {
        rpcVersion: 1
      });
      console.log(`[connectInfo]: `, connectInfo);
      await delay(1000);

      // Update the stream settings
      await obs.call("SetStreamServiceSettings", {
        streamServiceType: "rtmp_custom",
        streamServiceSettings: {
          server,
          key,
          use_auth: false
        }
      });

      console.log("Stream settings updated successfully");
      // const status = await obs.call("GetSteamStatus");
      // console.log(`[get stream status]: `, status);
      await delay(2000);

      await obs.call("StartStream");
      console.log("obs started!");

      await delay(5000);

      await obs.disconnect();
      console.log("obs connection disconned!");
    } catch (e) {
      console.log("Failed to connect or update settings:", e);
    }
  }

  // 关闭直播伴侣
  async function closeBanlv(event) {
    const banlvWindow = xwin.activeWindow();
    const isBanlvOpened = checkIfWindowLoaded({
      title: "直播伴侣",
      window: banlvWindow
    });

    if (!isBanlvOpened) {
      console.log(`[直播伴侣]: not active`);
      event.reply(
        "live:one-click",
        JSON.stringify({
          code: -1,
          messsage: "OBS直播成功！由于直播伴侣不是当前窗口，请手动关闭直播伴侣！"
        })
      );
      return;
    }

    const { x, y, width, height } = banlvWindow.position;
    const closeBanlvPosition = {
      x: x + width - 30,
      y: y + 30
    };
    mouse.move(new Point(closeBanlvPosition.x, closeBanlvPosition.y));
    mouse.leftClick();
    await delay(1000);

    await clickButtonInActiveWindow({
      text: "确定",
      imageName: "关闭直播伴侣",
      bounds: {
        x: x / 2 - 140,
        y: y / 2 - 120,
        width: 280,
        height: 240
      }
    });
  }

  // displace 偏移量
  async function clickButtonInActiveWindow({ text, bounds, imageName, displace }) {
    console.log(`[windowRegion]: `, text, bounds);
    try {
      const windowRegion = new Region(bounds.x, bounds.y, bounds.width, bounds.height);
      // const webSocketRes = await screen.grabRegion(windowRegion);
      // 'WebSocket按钮',
      const screenCapture = await screen.captureRegion(imageName || "TempScreenShot", windowRegion);
      // const findRes = await screen.find(webSocketRes);
      // console.log(`[findRes]: `, findRes);
      // screenCapture.toPNG();

      const ocrResult = await performOCR(screenCapture);
      console.log(`[ocrResult]: `, JSON.stringify(ocrResult));

      const webSocketBox = ocrResult.boxes.filter((box) => new RegExp(text, "i").test(box.text));
      if (webSocketBox && webSocketBox.length) {
        const webSocketPosition = webSocketBox[0].box;

        let buttonX = bounds.x + (webSocketPosition.x1 + webSocketPosition.x0) / 2;
        let buttonY = bounds.y + (webSocketPosition.y1 + webSocketPosition.y0) / 2;
        if (displace) {
          buttonX += displace.x;
          buttonY += displace.y;
        }
        console.log("[Matrix]: ", buttonX, buttonY);
        await mouse.move(new Point(buttonX, buttonY));
        await mouse.leftClick();
      } else {
        console.log("Button not found");
      }
    } catch (e) {
      console.error(e);
    }
  }

  ipcMain.on("obs:set-websocket-setting", async (event, arg) => {
    try {
      // 1. 查看obs是否启动
      // 2. 打开webSocket标签

      if (osType !== "win") {
        console.log(`${osType}`);
        return;
      }

      console.log(`[OBS]: try to start`);
      // robot.setMouseDelay(2);

      // 等待obs启动
      const OBSObj = await startOBS();

      const mainWindow = await loadOBSMainWindow(20000);

      // 点击工具栏
      console.log(`[Click]: 工具栏`);
      console.log(`[mainWindow]: `, mainWindow);
      const { x, y, width, height } = mainWindow.position;
      const toolPosition = {
        x: x + 450,
        y: y + 40
      };
      mouse.move(new Point(toolPosition.x, toolPosition.y));
      mouse.leftClick();

      await delay(2000);

      // 点击工具栏的Websocket服务器设置
      console.log(`[点击服务器设置]: `);
      await clickButtonInActiveWindow({
        text: "WebSocket",
        imageName: "toolbar截图",
        bounds: {
          x: toolPosition.x - 30,
          y: toolPosition.y,
          width: 180,
          height: 280
        }
      });
      await delay(2000);

      const webSocketServer = xwin.activeWindow();

      console.log(`[WebSocket]: before settings`);
      if (!/websocket/i.test(webSocketServer.title)) return;

      // websocket 服务器开启
      console.log(`[点击服务器设置]: `);
      await clickButtonInActiveWindow({
        text: "websocket",
        imageName: "Websocket设置",
        bounds: {
          x: webSocketServer.position.x,
          y: webSocketServer.position.y,
          width: webSocketServer.position.width,
          height: webSocketServer.position.height
        }
      });

      await delay(2000);

      // websocket 打开提醒
      console.log(`[打开提醒]: `);
      await clickButtonInActiveWindow({
        text: "系统",
        imageName: "Websocket设置",
        bounds: {
          x: x + (width - 800) / 2,
          y: y + (height - 800) / 2,
          width: 800,
          height: 800
        }
      });

      await delay(2000);

      // websocket 取消认证
      console.log(`[取消认证]: `);
      await clickButtonInActiveWindow({
        text: "认证",
        imageName: "Websocket设置",
        bounds: {
          x: x + (width - 800) / 2,
          y: y + (height - 800) / 2,
          width: 800,
          height: 800
        }
      });

      await delay(2000);

      // websocket 确认配置
      console.log(`[确认配置]: `);
      await clickButtonInActiveWindow({
        text: "确定",
        imageName: "Websocket设置",
        bounds: {
          x: x + (width - 800) / 2,
          y: y + (height - 800) / 2,
          width: 800,
          height: 800
        }
      });

      const obsPassword = await clipboard.readText("selection");
      console.log(`[Clipboard]: `, obsPassword);
      event.reply("obs:got-obs-password", obsPassword);

      //   const screenRegion = await screen.capture();
      //   console.log(`[screenRegion]: `, screenRegion);
      //   // Find the tab bar
      //   // const tabBarPosition = await screen.find("obs_tab_bar.png");
      //   // await mouse.setPosition(straightTo(centerOf(tabBarPosition)));
      //   // // Move mouse to the password field
      //   // // Replace with the actual coordinates of your password field
      //   // await mouse.setPosition(
      //   //   straightTo(
      //   //     centerOf(screen.find("path_to_password_field_image.png"))
      //   //   )
      //   // );
      //   // // Click on the password field
      //   // await mouse.leftClick();
      //   // // Type the password
      //   // await keyboard.type("your_password");
      //   // // Press Enter
      //   // await keyboard.pressKey(Key.Enter);
      //   // await keyboard.releaseKey(Key.Enter);
      // }, 5000); // Adjust the timeout based on your system's speed
    } catch (e) {
      console.error("[websocket]: err ", e);
      e &&
        event.reply(
          "live:one-click",
          JSON.stringify({
            code: e.code || -1,
            message: e.message || "一键直播出错"
          })
        );
    }
  });

  ipcMain.on("obs:set-stream-setting", async (event, arg) => {
    const params = JSON.parse(arg);
    console.log(`[server, key]: `, params);

    if (osType !== "win") {
      console.log(`${osType}`);
      return;
    }

    let message = "";
    try {
      // 开启OBS
      console.log(`[OBS]: ensuring`);
      await startOBS();
      // 保证OBS状态
      const obsWindow = await ensureOBSStarted(20000);
      // 设置OBS直播信息
      console.log(`Setting... [OBS Live]`);
      await setOBSLive(params);
      // 关闭直播伴侣
      // console.log(`Closing [Banlv]...`);
      // await closeBanlv(event);
      await wireshark.stopCapture();
    } catch (e) {
      console.log(`[Ensuring]: OBS error `, e);
      e &&
        event.reply(
          "live:one-click",
          JSON.stringify({
            code: e.code || -1,
            message: e.message || "一键直播出错"
          })
        );
    }
  });

  ipcMain.on("tictok:get-network-list", async (event, arg) => {
    console.log(`[Tictok]: Network List `, arg);

    try {
      const networkList = await wlan.getWlan(osType === "win" ? { installPath: wiresharkInstallPath } : {});
      console.log(`网卡列表：`, networkList);
      event.reply("tictok:got-network-list", networkList);
    } catch (e) {
      console.log(`[Tictok error]: get network list `, e);
    }
  });

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (dev) {
      const { default: installExtension, REACT_DEVELOPER_TOOLS } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function runPowerShellPrivilege(scriptPath) {
  // Execute the PowerShell script
  return new Promise((resolve, reject) => {
    exec(
      `C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe Set-ExecutionPolicy RemoteSigned -Scope LocalMachine -Force`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          reject(`[Powershell privilege run error]: `, error);
          return;
        }
        if (stderr) {
          console.log(`[Powershell privilege run error]: `, stderr);
          reject(new Error(stderr));
          return;
        }
        // Parse the output
        const result = stdout.trim();
        resolve(result);
      }
    );
  });
}

function runPowerShellScript(scriptPath) {
  // Execute the PowerShell script
  return new Promise((resolve, reject) => {
    exec(
      `C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -File "${scriptPath}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          reject(`[Powershell run error]: `, error);
          return;
        }
        if (stderr) {
          console.log(`[Powershell run error]: `, stderr);
          reject(new Error(stderr));
          return;
        }
        // Parse the output
        const result = stdout.trim();
        resolve(result);
      }
    );
  });
}

function runFindScript(scriptPath) {
  // Execute the PowerShell script
  return new Promise((resolve, reject) => {
    exec(
      `C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -File "${scriptPath}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          reject(`[Powershell run error]: `, error);
          return;
        }
        if (stderr) {
          console.log(`[Powershell run error]: `, stderr);
          reject(new Error(stderr));
          return;
        }
        // Parse the output

        try {
          const result = JSON.parse(stdout);
          console.log("Found installation paths:", result);
          resolve(result);
        } catch (e) {
          console.error(`Error parsing PowerShell output: ${parseError}`);
        }
      }
    );
  });
}

// Function to execute a PowerShell script and retrieve the result
// function runPowerShellScript(scriptPath, callback) {
//   // Spawn a new PowerShell process
//   const powershell = spawn(
//     "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
//     ["-File", scriptPath]
//   );

//   let output = "";

//   // Handle standard output
//   powershell.stdout.on("data", (data) => {
//     output += data.toString();
//   });

//   // Handle errors
//   powershell.stderr.on("data", (data) => {
//     callback(new Error(data.toString()));
//   });

//   // Handle process termination
//   powershell.on("exit", (code) => {
//     if (code === 0) {
//       // Parsing the output assuming it's in JSON format
//       try {
//         const result = output.trim();
//         // const result = JSON.parse(output.trim());
//         callback(null, result);
//       } catch (error) {
//         callback(new Error("Failed to parse PowerShell output"));
//       }
//     } else {
//       callback(new Error(`PowerShell script exited with code ${code}`));
//     }
//   });
// }

const arch = os.arch(); // 操作系统架构，例如 'x64'

// 判断 Windows 系统的架构并选择 Wireshark 安装程序版本
let wiresharkInstallerPath;
if (platform === "win32") {
  if (arch === "x64") {
    wiresharkInstallerPath = path.join(
      __dirname,
      dev ? "./resources/exe/Wireshark-4.2.3-x64.exe" : "../exe/Wireshark-4.2.3-x64.exe"
    );
  } else if (arch === "arm") {
    wiresharkInstallerPath = path.join(
      __dirname,
      dev ? "./resources/exe/Wireshark-4.2.3-arm64.exe" : "../exe/Wireshark-4.2.3-arm64.exe"
    );
  } else {
    console.error("Unsupported Windows architecture:", arch);
  }
} else {
  console.error("Wireshark installation is only supported on Windows.");
}

async function checkWiresharkPath(callback) {
  // 设置环境变量
  try {
    // await runPowerShellPrivilege();
    const wiresharkRes = await runPowerShellScript(
      path.join(__dirname, dev ? "./resources/find-wireshark-reg.ps1" : "../find-wireshark-reg.ps1")
    );
    wiresharkInstallPath = wiresharkRes;
    console.log(`[Installed Wireshark]: env `, wiresharkRes);

    if (wiresharkRes) {
      await runPowerShellScript(
        path.join(__dirname, dev ? `./resources/set-wireshark-path.ps1` : `../set-wireshark-path.ps1`),
        ` -Path "${wiresharkRes}"`
      );
    }

    callback();
  } catch (e) {
    console.log(`[Set environment]: `, e);
  }
}

async function checkOBSPath() {
  // 设置环境变量
  try {
    // 注册表删除程序有OBS，证明不是steam安装的
    let isSteam = true;
    let obsRes = await runPowerShellScript(
      path.join(__dirname, dev ? "./resources/find-obs-uninstall.ps1" : "../find-obs-uninstall.ps1")
    );
    if (obsRes) {
      isSteam = false;
      return {
        isSteam,
        path: obsRes
      };
    }

    // 查找OBS reg
    obsRes = await runFindScript(
      path.join(__dirname, dev ? "./resources/find-obs-reg.ps1" : "../find-obs-reg.ps1")
    );
    // obsInstallPath = obsRes;
    if (obsRes && obsRes["DefaultValue"]) {
      return {
        isSteam,
        path: obsRes["DefaultValue"]
      };
    }

    return "";
  } catch (e) {
    console.log(`[Set environment]: `, e);
  }
}

async function checkBanlvPath() {
  // 设置环境变量
  try {
    // await runPowerShellPrivilege();
    const banlvRes = await runFindScript(
      path.join(__dirname, dev ? "./resources/find-banlv-reg.ps1" : "../find-banlv-reg.ps1")
    );
    console.log(`[Installed Banlv]: env `, banlvRes);

    return banlvRes["InstallLocation"];
  } catch (e) {
    console.log(`[Set environment]: `, e);
  }
}

async function eatDeviceId() {
  if (!fs.existsSync(appid_path)) {
    const device_id = uuidv4();
    console.log(`[user_path]: `, user_path, device_id);
    fs.writeFileSync(appid_path, device_id, "utf-8");
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  // const wsRes = await which("wireshark", { nothrow: true });
  // console.log(`[Wireshark]: res `, wsRes);
  const serverProcess = fork(
    path.join(__dirname, `${dev ? "./resources/site/server.js" : "./resources/site/server.js"}`)
  );
  console.log(`[Static Server]: `);

  await eatDeviceId();

  if (osType === "win") {
    const softwareRes = await runPowerShellScript(
      path.join(__dirname, dev ? "./resources/find-software.ps1" : "../find-software.ps1")
    );
    if (!/wireshark/i.test(softwareRes)) {
      const wiresharkRes = await runPowerShellScript(
        path.join(__dirname, dev ? "./resources/find-wireshark-reg.ps1" : "../find-wireshark-reg.ps1")
      );

      wiresharkInstallPath = wiresharkRes;

      if (!/wireshark/i.test(wiresharkRes)) {
        // 执行 Wireshark 安装程序

        const installProcess = exec(`"${wiresharkInstallerPath}"`);

        // 监听安装过程的输出
        installProcess.stdout.on("data", (data) => {
          console.log(`[Wireshark install]: stdout, `, data);
        });

        installProcess.stderr.on("data", (data) => {
          console.error(`[Wireshark install]: stderr, `, data);
        });

        installProcess.on("close", async (code) => {
          console.log(`Wireshark installation process exited with code ${code}`);

          checkWiresharkPath(createWindow);
        });
      } else {
        console.log(`[Reg]: find wireshark`);
        checkWiresharkPath(createWindow);
      }
    } else {
      console.log(`[Reg]: find software`);
      createWindow();
    }
  } else {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
