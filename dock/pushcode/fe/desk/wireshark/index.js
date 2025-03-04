const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

let childProcess;

async function capturePackets({ installPath = "", interface }) {
  childProcess = null;
  return new Promise(async (resolve, reject) => {
    const result = {};
    const command = installPath ? path.join(installPath, "tshark") : `tshark`;
    const args = [
      "-i",
      interface,
      "-l",
      "-T",
      "fields",
      "-e",
      "frame.time",
      "-e",
      "eth.src",
      "-e",
      "eth.dst",
      "-e",
      "ip.src",
      "-e",
      "ip.dst",
      "-e",
      "tcp.srcport",
      "-e",
      "tcp.dstport",
      "-e",
      "amf.string",
      "-e",
      "data"
    ];

    const child = spawn(command, args);
    childProcess = child;

    // const logFile = fs.createWriteStream("packet_log.txt", { flags: "a" }); // Append mode

    // child.stdout.pipe(logFile);
    // child.stderr.pipe(process.stderr); // Redirect stderr to the console for error output.

    child.stdout.on("data", (data) => {
      const lines = data
        .toString()
        .split("\n")
        .filter((line) => line.trim() !== ""); // Split lines and filter out empty lines

      for (const line of lines) {
        const [timestamp, ethSrc, ethDst, ipSrc, ipDst, srcPort, dstPort, amfString, packetData] =
          line.split("\t");
        //  console.log("Timestamp:", timestamp);
        if (amfString) {
          console.log("Timestamp:", timestamp);
          console.log("Ethernet Source:", ethSrc);
          console.log("Ethernet Destination:", ethDst);
          console.log("IP Source:", ipSrc);
          console.log("IP Destination:", ipDst);
          console.log("Source Port:", srcPort);
          console.log("Destination Port:", dstPort);
          console.log("Amf.string:", amfString);

          if (packetData) {
            console.log("Packet Data:", packetData);
          }

          console.log("\n");

          if (packetData) {
            console.log(
              `${timestamp}\t${ethSrc}\t${ethDst}\t${ipSrc}\t${ipDst}\t${srcPort}\t${dstPort}\t${amfString}${packetData}\n`
            );
          }

          if (amfString.indexOf("connect,") >= 0) {
            const amfArr = amfString.split(",");
            const url = amfArr[amfArr.length - 1];
            result.url = url;
          }

          if (amfString.indexOf("releaseStream,") >= 0) {
            const amfArr = amfString.split(",");
            const token = amfArr[amfArr.length - 1];
            result.token = token;
          }

          if (result.url && result.token) {
            resolve({
              code: 0,
              data: result,
              message: "Capture success"
            });
            // stopCapture();
            return;
          }
        }
      }
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log(`Packet capture completed, ${interface}`);
        resolve("Packet capture completed");
      } else {
        console.log(`Packet capture failed with code ${code}`);
        resolve(`Packet capture failed with code ${code}`);
      }
    });

    child.on("error", (error) => {
      console.log(`[why Wireshark child spawn error]: `, error);
      reject({
        code: -1,
        message: `Error capturing packets: ${error.message}`
      });
    });
  });
}

async function stopCapture() {
  if (childProcess) {
    childProcess.kill();
    childProcess = null; // Reset the child process variable
  }
}

process.on("SIGINT", () => {
  console.log(`[Sigint]: captured, exiting...`);
  stopCapture();
  process.exit();
});

module.exports = {
  capturePackets,
  stopCapture
};
