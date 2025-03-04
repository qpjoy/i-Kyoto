const os = require("os");
const path = require("path");

const { exec } = require("child_process");

// 获取操作系统类型和架构
const platform = os.platform(); // 操作系统类型，例如 'win32'
const arch = os.arch(); // 操作系统架构，例如 'x64'

// 判断 Windows 系统的架构并选择 Wireshark 安装程序版本
let wiresharkInstallerPath;
if (platform === "win32") {
  if (arch === "x64") {
    wiresharkInstallerPath = path.join(__dirname, "exe/Wireshark-4.2.3-x64.exe");
  } else if (arch === "arm") {
    wiresharkInstallerPath = path.join(__dirname, "exe/Wireshark-4.2.3-arm64.exe");
  } else {
    console.error("Unsupported Windows architecture:", arch);
  }
} else {
  console.error("Wireshark installation is only supported on Windows.");
}

// 如果 Wireshark 安装程序路径存在，则执行安装
if (wiresharkInstallerPath) {
  // 执行 Wireshark 安装程序

  const installProcess = exec(wiresharkInstallerPath);

  // 监听安装过程的输出
  installProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  installProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  installProcess.on("close", (code) => {
    console.log(`Wireshark installation process exited with code ${code}`);
  });
}
