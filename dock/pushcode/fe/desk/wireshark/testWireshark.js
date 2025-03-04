const wireshark = require("./index");
const wlan = require("./wlan");

(async () => {
  try {
    const networks = await wlan.getWlan();
    console.log(`[网卡列表]: `, networks);
    const number = 6;
    console.log(`自动选择网卡编号：`, number);
    const result = await wireshark.capturePackets(number);
    console.log(`[推流码结果]: `, result);
  } catch (e) {
    console.log(e);
  }
})();
