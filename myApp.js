var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  res.json({
    message: () =>
      process.env.MESSAGE_STYLE === "uppercase"
        ? "Hello json".toUpperCase()
        : "Hello json",
  });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

app.get(
  "/:word/echo",
  (req, res, next) => {
    word = req.params.word;
    next();
  },
  (req, res) => {
    res.send({ echo: word });
  }
);

app.get("/name", (req, res) => {
  let firstname = req.query.first;
  let lastname = req.query.last;
  res.json({ name: `${firstname} ${lastname}` });
});

app.use("/", (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
