const MILLISECOND = 0.001;

// *********************************
// Extracting information about the scene(canvas)
var boundsX = document.getElementById("tutorialCanvas").getAttribute("width");
var boundsY = document.getElementById("tutorialCanvas").getAttribute("height");

var floorHeight = (3 * boundsY) / 4;
var wallPosX = boundsX / 5;
var bigSquareStartPos = (2 * boundsX) / 5;
var smallSquareStartPos = (1 * boundsX) / 4;

var collisionOutput = document.getElementById("collisionsOutput");
var cal_PI = document.getElementById("cal_PI");

var bigSquareWidth = boundsX / 6;
var bigSquareHeight = boundsX / 6;
var smallSquareWidth = boundsX / 12;
var smallSquareHeight = boundsX / 12;

var canvas;
/** @type {CanvasRenderingContext2D} */
var ctx;
canvas = document.getElementById("tutorialCanvas");

// *********************************

// Initialise objects to their starting positions
var collidingLargeSquare = {
  mass: 0,
  posX: bigSquareStartPos,
  posY: floorHeight - bigSquareWidth,
  width: bigSquareWidth,
  height: bigSquareHeight,
  vX: 0,
  vY: 0
};

var collidingSmallSquare = {
  mass: 0,
  posX: smallSquareStartPos,
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
var collisionCount
var timeStep
var calPerFrame

function start() {
  collisionCount = 0;
  init()
  StartAnimation()
  StartEngine()
}

function init() {
  collidingLargeSquare.mass = parseInt(document.getElementById("mLarge").value);
  collidingLargeSquare.posX = bigSquareStartPos;
  collidingLargeSquare.vX = -parseInt(document.getElementById("vLarge").value);

  collidingSmallSquare.mass = parseInt(document.getElementById("mSmall").value);
  collidingSmallSquare.posX = smallSquareStartPos;
  collidingSmallSquare.vX = -parseInt(document.getElementById("vSmall").value);

  massRatio = Math.sqrt(collidingLargeSquare.mass / collidingSmallSquare.mass);

  timeStep = document.getElementById("timeStep").value;

  calPerFrame = document.getElementById("calPerFrame").value;
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

function StartEngine() {
  engine = window.setInterval(function () { physicsEngine(timeStep, calPerFrame); }, 1);
}

function StartAnimation(){
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    animation = window.requestAnimationFrame(calculatingPIDraw);
  } else {
    // canvas unsupported code here
  }
}

function StopAnimation() {
  if (animation != null) {
    animation = cancelAnimationFrame(animation);
  }
}

// Allow user to change the time step and calculations per frame during pause
function continueSim() {
  if (engine == null & animation == null) {
    var timeStep = document.getElementById("timeStep").value;
    var _calPerFrame = document.getElementById("calPerFrame").value;
    engine = window.setInterval(function () { physicsEngine(timeStep, _calPerFrame); }, 1);
    animation = window.requestAnimationFrame(calculatingPIDraw);
  }
}

function physicsEngine(_timeStep, _calPerFrame) {

  // This sim requires very small time steps for calculating PI at large decimal places.
  // However the setInterval function can only be executed every milisecond.
  // To bypass this the physics engine can do multiple time steps in each call of physicsEngine call
  for (let index = 0; index < _calPerFrame; index++) {
    if (
      collisionDetection(
        collidingSmallSquare,
        collidingLargeSquare,
        wall,
        _timeStep
      )
    ) {
      collisionCount += 1;
      collisionOutput.innerHTML = collisionCount;
      // PI = collision / (100 ^ (masslarge/massSmall))
      cal_PI.innerHTML = collisionCount / massRatio;
    }
    move(collidingSmallSquare, _timeStep);
    move(collidingLargeSquare, _timeStep);
  }
}
