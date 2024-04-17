const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Приложение запущено тут: http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readFile("./public/index.html", "utf-8").then((data) => {
    res.header("Content-Type", "text/html");
    res.send(data);
  });
});
