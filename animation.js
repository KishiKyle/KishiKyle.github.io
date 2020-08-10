function calculatingPIDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFloor();
    drawWall();
    drawSquare(collidingLargeSquare);
    drawSquare(collidingSmallSquare);
    animation = window.requestAnimationFrame(calculatingPIDraw);

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
