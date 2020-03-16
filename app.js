var boundsX = document.getElementById("tutorialCanvas").getAttribute("width");
var boundsY = document.getElementById("tutorialCanvas").getAttribute("height");

var collisionOutput = document.getElementById("collisionsOutput");

var floorHeight = (3 * boundsY) / 4;
var wallPosX = boundsX / 5;

var bigSquareWidth = boundsX / 6;
var bigSquareHeight = boundsX / 6;
var smallSquareWidth = boundsX / 12;
var smallSquareHeight = boundsX / 12;

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

function init() {
  var massSmallSquare = document.getElementById("mSmall").value;
  var massLargeSquare = document.getElementById("mLarge").value;
  var velocitySmallSquare = document.getElementById("vSmall").value;
  var velocityLargeSquare = document.getElementById("vLarge").value;

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
    window.requestAnimationFrame(draw);
  } else {
    // canvas unsupported code here
  }
  collisionCount = 0;
  var massRatio = collidingLargeSquare.mass / collidingSmallSquare.mass / 10;
  var defaultTimeStep = 0.001;
  timeStep = defaultTimeStep / massRatio;
  window.setInterval(physicsEngine, timeStep * 1000);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFloor();
  drawWall();
  drawSquare(collidingLargeSquare);
  drawSquare(collidingSmallSquare);
  window.requestAnimationFrame(draw);

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

var timeStep = 0.01;
var collisionCount = 0;

function physicsEngine() {
  if (
    collisionDetection(
      collidingLargeSquare,
      collidingSmallSquare,
      container,
      wall
    )
  ) {
    console.log((collisionCount += 1));
    collisionOutput.innerHTML = "Collisions: " + collisionCount;
  }
  move(collidingLargeSquare);
  if (
    collisionDetection(
      collidingSmallSquare,
      collidingLargeSquare,
      container,
      wall
    )
  ) {
    console.log((collisionCount += 1));
    collisionOutput.innerHTML = "Collisions: " + collisionCount;
  }
  move(collidingSmallSquare);

  function collisionDetection(mainSquare, otherSquare, container, wall) {
    if (checkCollision(otherSquare)) return true;
    if (checkCollision(wall)) return true;
    // if (checkBounds()) return true;

    function checkBounds() {
      if (
        mainSquare.posX + mainSquare.vX * timeStep + mainSquare.width >
          container.width ||
        mainSquare.posX < 0 ||
        mainSquare.posY + mainSquare.vY * timeStep + mainSquare.height >
          boundsY ||
        mainSquare.posY < 0
      ) {
        perfectallyElasticCollision(mainSquare, container);
      }
    }

    function checkCollision(collidingObj) {
      // Axis-Aligned collision check
      // No gap between all sides means collision
      if (
        mainSquare.posX + mainSquare.width + mainSquare.vX * timeStep >
          collidingObj.posX &&
        mainSquare.posX + mainSquare.vX * timeStep <
          collidingObj.posX + collidingObj.width &&
        mainSquare.posY + mainSquare.width + mainSquare.vY * timeStep >
          collidingObj.posY &&
        mainSquare.posY + mainSquare.vY * timeStep <
          collidingObj.posY + collidingObj.height
      ) {
        perfectallyElasticCollision(mainSquare, collidingObj);
        return true;
      }
      // Conservation of total momentum
      // m1u1 + m2u2 = m1v1 + m2v2
      // Conservation of kinetic energy
      // (1/2)m1u1^2 + (1/2)m2u2^2 = (1/2)m1v1^2 + (1/2)m2v2^2

      // v1 = u1((m1-m2)/(m1+m2)) + u2(2m2/(m1+m2))
      // v2 = u1(2m1/(m1+m2)) + u2((m2-m1)/(m1+m2))
    }

    function perfectallyElasticCollision(mainObj, collidingObj) {
      var u1 = mainObj.vX;
      var m1 = mainObj.mass;
      var u2 = collidingObj.vX;
      var m2 = collidingObj.mass;
      if (m2 === Infinity) {
        mainObj.vX = -mainObj.vX;
      } else {
        mainObj.vX = u1 * ((m1 - m2) / (m1 + m2)) + u2 * ((2 * m2) / (m1 + m2));
        collidingObj.vX =
          u1 * ((2 * m1) / (m1 + m2)) + u2 * ((m2 - m1) / (m1 + m2));
      }
    }
  }

  function move(mainSquare) {
    mainSquare.posX += mainSquare.vX * timeStep;
    mainSquare.posY += mainSquare.vY * timeStep;
  }
}
