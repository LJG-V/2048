function drawNumStyle(randX,randY,randomNum) {
    let numberCell = document.getElementById(`number-cell`+randX+'-'+randY);
    numberCell.style.backgroundColor = getNumBackgroundColor(randomNum);
    numberCell.style.color = getNumColor(randomNum);
    numberCell.textContent = randomNum;
    numberCell.style.width = "100px";
    numberCell.style.height = "100px";
    numberCell.style.top = getPosTop(randX,randY) + "px";
    numberCell.style.left = getPosLeft(randX,randY)+ "px";
}

function showMoveAnimation(fromX,fromY,toX,toY) {
    let numberCell = document.getElementById(`number-cell`+fromX+'-'+fromY);
    if (toY > fromY) {
        numberCell.style.transform = "translateX("+320+"px)";
        numberCell.style.transition = "transform 1s ease-out";
    }else if (toY <fromY) {
        numberCell.style.transform = "translateX("+-320+"px)";
        numberCell.style.transition = "transform 1s ease-out";
    }else if (toX > fromX) {
        numberCell.style.transform = "translateY("+320+"px)";
        numberCell.style.transition = "transform 1s ease-out";
    }else {
        numberCell.style.transform = "translateY("+-320+"px)";
        numberCell.style.transition = "transform 1s ease-out";
    }
}