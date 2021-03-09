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
    case 65: // A left
      movement.left = true;
      break;
    case 68: // D right
      movement.right = true;
      break;
    case 83: // W down
      movement.up = true;
      break;
    case 87: // S up
      movement.down = true;
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.keyCode) {
    case 65: // A left
      movement.left = false;
      break;
    case 68: // D right
      movement.right = false;
      break;
    case 83: // W down
      movement.up = false;
      break;
    case 87: // S up
      movement.down = false;
      break;
  }
});

socket.emit("new player");
setInterval(() => {
  socket.emit("movement", movement);
}, 1000 / 60);

canvas.width = 800;
canvas.height = 600;


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
