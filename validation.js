function validateMass() {
    var validationOfMassText = document.getElementById("validationOfMassText");
    var massSmallSquare = document.getElementById("mSmall").value;
    var massLargeSquare = document.getElementById("mLarge").value;

    if (!Number.isInteger(Math.sqrt(massLargeSquare / massSmallSquare))) {
        validationOfMassText.innerHTML = "Note: The ratio of the large mass and small mass must be a power of 100 for the number of collisions to equate to PI. The current ratio is not a power of 100"
    }
    else{
        validationOfMassText.innerHTML = ""
    }

}