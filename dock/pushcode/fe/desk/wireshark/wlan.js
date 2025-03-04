const { spawn } = require("node:child_process");
const { error } = require("node:console");
const fs = require("node:fs");
const path = require("node:path");

let childProcess;

async function getWlan({ installPath = "" }) {
  return new Promise((resolve, reject) => {
    const command = installPath ? path.join(installPath, "tshark") : `tshark`;
    const args = ["-D"];
    const child = spawn(command, args);
    childProcess = child;

    // const logFile = fs.createWriteStream('get_wlan.txt', { flags: 'a' });

    // child.stdout.pipe(logFile);
    // child.stderr.pipe(process.stderr);

    child.stdout.on("data", (data) => {
      const lines = data
        .toString()
        .split("\n")
        .filter((line) => line.trim() !== "");
      const networkList = [];
      for (const line of lines) {
        const [number, wifi] = line.split(". ");
        networkList.push({
          number,
          wifi
        });
        // if(/wlan/ig.test(wifi) || wifi.indexOf('Wi-Fi') >= 0) {
        //     return resolve({
        //         number,
        //         list: data.toString()
        //     });
        // }
      }
      return resolve(networkList);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve("Get WLAN completed");
      } else {
        reject(`Get WLAN failed with code ${code}`);
      }
    });

    child.on("error", (error) => {
      console.log(`[Wlan]: spawn error `, error);
      reject(`Error capturing packets: ${error.message}`);
    });
  });
}

async function stopWLANScript() {
  if (childProcess) {
    childProcess.kill();
    childProcess = null;
  }
}

process.on("SIGINT", () => {
  stopWLANScript();
  process.exit();
});

module.exports = {
  getWlan,
  stopWLANScript
};
