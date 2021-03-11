require("dotenv").config();
const portNum = process.env.PORT || 3000;

const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const expect = require("chai");

const fccTestingRoutes = require("./routes/fcctesting.js");
const runner = require("./test-runner.js");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set("port", portNum);
app.use("/public", express.static(process.cwd() + "/public"));
app.use("/assets", express.static(process.cwd() + "/assets"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//For FCC testing purposes
fccTestingRoutes(app);

// 404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

// Set up server and tests
server.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV === "test") {
    console.log("Running Tests...");
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log("Tests are not valid:");
        console.error(error);
      }
    }, 1500);
  }
});

io.on("connection", (socket) => {});

setInterval(() => {
  io.sockets.emit("message", "hi!");
}, 1000);

var players = {};
io.on("connection", (socket) => {
  socket.on("new player", () => {
    console.log("Player connected: ", socket.id)
    players[socket.id] = {
      x: 300,
      y: 300,
    };
  });
  socket.on("movement", (data) => {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.up) {
      player.y += 5;
    }
    if (data.down) {
      player.y -= 5;
    }
  });
  socket.on('disconnect', () => {
    console.log('player disconnected')
  })
});

setInterval(() => {
  io.sockets.emit("state", players);
}, 1000 / 60);


module.exports = app; // For testing
