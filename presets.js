function loadPresets() {

    var preset = document.getElementById("presets").value;


    var massSmallSquare = document.getElementById("mSmall");
    var massLargeSquare = document.getElementById("mLarge");
    var velocitySmallSquare = document.getElementById("vSmall");
    var velocityLargeSquare = document.getElementById("vLarge");
    var _timeStep = document.getElementById("timeStep");
    var _calPerFrame = document.getElementById("calPerFrame");

    switch (true) {
        case (preset < 5):
            massSmallSquare.value = 1;
            velocitySmallSquare.value = 0;
            velocityLargeSquare.value = 100;
            massLargeSquare.value = massSmallSquare.value * Math.pow(100, preset);
            _timeStep.value = 0.01 / Math.pow(10, preset);
            _calPerFrame.value = 0.1 * Math.pow(10, preset)
            break;
        case (preset >= 5):
            massSmallSquare.value = 1;
            velocitySmallSquare.value = 0;
            velocityLargeSquare.value = 100;
            massLargeSquare.value = massSmallSquare.value * Math.pow(100, preset);
            _timeStep.value = 0.01 / Math.pow(10, preset);

            // Limiting to 10000 as higher values can put strain on cpu
            _calPerFrame.value = 10000;

        default:
            break;
    }


}