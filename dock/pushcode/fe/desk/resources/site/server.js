const express = require("express");
const path = require("path");

const app = express();
const port = 9899;

const staticPath = path.join(__dirname, "static");

app.use(express.static(staticPath));

app.listen(port, "0.0.0.0", () => {
  console.log(`Static Server is running at http://localhost:${port}`);
});
