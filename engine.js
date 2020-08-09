function checkBounds(mainSquare, timeStep) {
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

function checkCollision(mainSquare, collidingObj, timeStep) {
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

function move(mainSquare, timeStep) {
    mainSquare.posX += mainSquare.vX * timeStep;
    mainSquare.posY += mainSquare.vY * timeStep;
}