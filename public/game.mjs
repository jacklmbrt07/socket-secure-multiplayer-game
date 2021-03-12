// import Player from "./Player.mjs";
// import Collectible from "./Collectible.mjs";
// import { move } from "../server";

const socket = io();
const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");

socket.on("message", function (data) {
  console.log(data);
});

var movement = {
  up: false,
  down: false,
  left: false,
  right: false,
};

document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 0x25: // left
      movement.left = true;
      break;
    case 0x26: // up
      movement.down = true;
      break;
    case 0x27: // right
      movement.right = true;
      break;
    case 0x28: // down
      movement.up = true;
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.keyCode) {
    case 0x25: // left
      movement.left = false;
      break;
    case 0x26: // up
      movement.down = false;
      break;
    case 0x27: // right
      movement.right = false;
      break;
    case 0x28: // down
      movement.up = false;
      break;
  }
});

socket.emit("new player");
setInterval(() => {
  socket.emit("movement", movement);
}, 1000 / 60);

canvas.width = 800;
canvas.height = 600;
//wtf
socket.on("state", (players) => {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = "green";
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});

// var lastUpdateTime = new Date().getTime();
// setInterval(() => {
//   var currentTime = new Date().getTime();
//   var timeDifference = currentTime - lastUpdateTime;
//   player.x += 5 * timeDifference;
//   lastUpdateTime = currentTime;
// }, 1000 / 60);
