var boundsX = document.getElementById("tutorialCanvas").getAttribute("width");
var boundsY = document.getElementById("tutorialCanvas").getAttribute("height");

var collisionOutput = document.getElementById("collisionsOutput");
var cal_PI = document.getElementById("cal_PI");

var floorHeight = (3 * boundsY) / 4;
var wallPosX = boundsX / 5;

var bigSquareWidth = boundsX / 6;
var bigSquareHeight = boundsX / 6;
var smallSquareWidth = boundsX / 12;
var smallSquareHeight = boundsX / 12;

const MILLISECOND = 0.001;

var canvas;
/** @type {CanvasRenderingContext2D} */
var ctx;

var collidingLargeSquare = {
  mass: 0,
  posX: (2 * boundsX) / 5,
  posY: floorHeight - bigSquareWidth,
  width: bigSquareWidth,
  height: bigSquareHeight,
  vX: 0,
  vY: 0
};

var collidingSmallSquare = {
  mass: 0,
  posX: (1 * boundsX) / 4,
  posY: floorHeight - smallSquareWidth,
  width: smallSquareWidth,
  height: smallSquareHeight,
  vX: 0,
  vY: 0
};

var container = {
  mass: Infinity,
  posX: 0,
  posY: 0,
  width: boundsX,
  height: boundsY,
  vX: 0,
  vY: 0
};

var wall = {
  mass: Infinity,
  posX: wallPosX,
  posY: 0,
  width: 0,
  height: floorHeight,
  vX: 0,
  vY: 0
};

var engine
var animation
var massRatio
var collisionCount = 0;


function init() {

  StopEngine();
  StopAnimation()

  var massSmallSquare = document.getElementById("mSmall").value;
  var massLargeSquare = document.getElementById("mLarge").value;
  var velocitySmallSquare = document.getElementById("vSmall").value;
  var velocityLargeSquare = document.getElementById("vLarge").value;
  var _timeStep = document.getElementById("timeStep").value;
  var _calPerFrame = document.getElementById("calPerFrame").value;

  collisionCount = 0;

  collidingLargeSquare = {
    mass: parseInt(massLargeSquare),
    posX: (2 * boundsX) / 5,
    posY: floorHeight - bigSquareWidth,
    width: bigSquareWidth,
    height: bigSquareHeight,
    vX: -parseInt(velocityLargeSquare),
    vY: 0
  };

  collidingSmallSquare = {
    mass: parseInt(massSmallSquare),
    posX: (1 * boundsX) / 4,
    posY: floorHeight - smallSquareWidth,
    width: smallSquareWidth,
    height: smallSquareHeight,
    vX: -parseInt(velocitySmallSquare),
    vY: 0
  };

  canvas = document.getElementById("tutorialCanvas");
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    animation = window.requestAnimationFrame(draw);
  } else {
    // canvas unsupported code here
  }

  massRatio = Math.sqrt(collidingLargeSquare.mass / collidingSmallSquare.mass);
 
  engine = window.setInterval(function () { physicsEngine(_timeStep, _calPerFrame); }, 1);
}

function stop() {
  StopEngine();
  StopAnimation()
}

function StopEngine() {
  if (engine != null) {
    engine = clearInterval(engine)
  }
}

function StopAnimation() {
  if (animation != null) {
    animation = cancelAnimationFrame(animation);
  }
}

function continueSim() {
  if (engine == null & animation == null) {
    var _timeStep = document.getElementById("timeStep").value;
    var _calPerFrame = document.getElementById("calPerFrame").value;
    engine = window.setInterval(function () { physicsEngine(_timeStep, _calPerFrame); }, 1);
    animation = window.requestAnimationFrame(draw);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFloor();
  drawWall();
  drawSquare(collidingLargeSquare);
  drawSquare(collidingSmallSquare);
  animation = window.requestAnimationFrame(draw);

  function drawWall() {
    ctx.beginPath();
    ctx.moveTo(wallPosX, 0);
    ctx.lineTo(wallPosX, floorHeight);
    ctx.closePath();
    ctx.strokeStyle = "rgb(76,25,27)";
    ctx.stroke();
    addWallSection(
      wallPosX - wallPosX / 3,
      0,
      wallPosX / 3,
      floorHeight,
      "rgb(76,25,27)"
    );
  }

  function addWallSection(x, y, width, height, color) {
    var dashHeight = width * Math.cos((45 * Math.PI) / 180);
    ctx.beginPath();
    for (let index = 0; index < height / dashHeight; index++) {
      ctx.moveTo(x + width, dashHeight * index);
      ctx.lineTo(x, dashHeight * index + dashHeight);
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function drawFloor() {
    ctx.beginPath();
    ctx.moveTo(0, floorHeight);
    ctx.lineTo(boundsX, floorHeight);
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  function drawSquare(square) {
    ctx.beginPath();
    ctx.rect(square.posX, square.posY, square.width, square.height);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }
}

function physicsEngine(timeStep, calPerFrame) {

  // Run the engine 1000 times every frame
  // for (let index = 0; index < 10; index++) {

    for (let index = 0; index < calPerFrame; index++) {
    if (
      collisionDetection(
        collidingSmallSquare,
        collidingLargeSquare,
        container,
        wall
      )
    ) {
      collisionCount += 1;
      collisionOutput.innerHTML = collisionCount;
      cal_PI.innerHTML = collisionCount/massRatio;

    }
    move(collidingSmallSquare, timeStep);
    move(collidingLargeSquare, timeStep);
  }

  // }

  function collisionDetection(mainSquare, otherSquare, container, wall) {
    if (checkCollision(mainSquare, otherSquare, timeStep)) return true;
    if (checkCollision(mainSquare, wall, timeStep)) return true;
    // if (checkBounds()) return true;

  }
}
