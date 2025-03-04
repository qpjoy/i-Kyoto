const { exec } = require("child_process");

export function checkWiresharkInstallation() {
  exec("where Wireshark", (error, stdout, stderr) => {
    if (error) {
      console.error("Wireshark is not installed:", error);
      // Perform actions based on Wireshark not being installed
    } else {
      console.log("Wireshark is installed:", stdout);
      // Perform actions based on Wireshark being installed
    }
  });
}
