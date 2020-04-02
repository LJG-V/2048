function getPosTop(i, j) {
    return 10 + 110 * i;
}

function getPosLeft(i, j) {
    return 10 + 110 * j;
}

function getNumBackgroundColor(number) {
    switch (number) {
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#d6ed08";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
}


function getNumColor(number) {
    if (number <= 4) {
        return "#776e65"
    }
    return "white";
}

function canMoveLeft(cells) {
    for (let i = 0;i<4;i++){
        for (let j = 1;j<4;j++){
            if (cells[i][j] !== 0){
                if (cells[i][j - 1] === 0 || cells[i][j - 1] === cells[i][j]){
                 return true;
                }
            }
        }
    }
}
function canMoveUp(cells) {
    for(var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (cells[i][j] !== 0) {
                if (cells[i - 1][j] === 0 || cells[i - 1][j] === cells[i][j]) {
                    return true;
                }
            }
        }
    }
}
function canMoveDown(cells) {
    for(var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (cells[i][j] !== 0) {
                if (cells[i + 1][j] === 0 || cells[i + 1][j] === cells[i][j]) {
                    return true;
                }
            }
        }
    }
}
function canMoveRight(cells) {
    for (let i = 0;i<4;i++){
        for (let j = 2;j>=0;j--){
            if (cells[i][j] !== 0){
                if (cells[i][j + 1] === 0 || cells[i][j + 1] === cells[i][j]){
                    return true;
                }
            }
        }
    }
}

function noBlockHorizontal(row,col1,col2,cells) {
    for (let i = col1 +1;i < col2;i++) {
        if (cells[row][i] !== 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical(col,row1,row2,cells){
    for(var i = row1 + 1; i < row2; i++){
        if(cells[i][col] !== 0){
            return false;
        }
    }
    return true;
}

function upScore(score) {
    let sc = document.getElementById("score");
    sc.textContent = score;
}


function gameOver(){
    let over = document.getElementById("over");
    let audio = document.createElement("audio");
    audio.src = "./music/m3.mp3";
    audio.play();
    over.style.visibility = "visible";
}

function nomove(cells){
    return !(canMoveLeft(cells) ||
        canMoveRight(cells) ||
        canMoveUp(cells) ||
        canMoveDown(cells));

}
function nospace(cells){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(cells[i][j] === 0){
                return false;
            }
        }
    }
    return true;
}