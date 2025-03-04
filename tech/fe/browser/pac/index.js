const express = require("express");
const app = express();
const PORT = 3000;

// Serve the PAC file
app.get("/proxy.pac", (req, res) => {
  res.header("Content-Type", "application/x-ns-proxy-autoconfig");
  res.sendFile(path.join(__dirname, "proxy.pac")); // Assuming proxy.pac is in the same directory
});

// Catch-all route to simulate a proxy for google.com
app.get("*", (req, res) => {
  const host = req.headers.host;
  if (host.includes("google.com")) {
    res.send(`You have reached the mock server for google.com at ${req.url}`);
  } else {
    res.send(`This is a mock server, you are visiting ${req.url}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
