const { spawn, exec } = require("child_process");

// Path to the PowerShell script
const psScriptPath = "../resources/run-tshark.ps1"; // Replace with the actual path to the PowerShell script

// Spawn the PowerShell process with the script
const psProcess = spawn(
  "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  ["-ExecutionPolicy", "Bypass", "-File", psScriptPath],
  { shell: true }
);

// Handle stdout and stderr
psProcess.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

psProcess.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

// Handle process exit
psProcess.on("exit", (code) => {
  console.log(`Child process exited with code ${code}`);
});

psProcess.stdin.end();
