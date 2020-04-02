window.onload = function() {
    let cells = new Array();
    let newgame = document.getElementById('newgame');
    let frame = document.getElementById('frame');
    let score = 0;

    init();
    generateNum();
    generateNum();
    newgame.onclick = function newgame() {
        score = 0;
        upScore(score);
        init();
        generateNum();
        generateNum();
    };

    //初始化棋盘
    function init() {
        let over1 = document.getElementById("over");
        over1.style.visibility = "hidden";
        for (let i = 0; i < 4; i++) {
            cells[i] = new Array();
            for (let j = 0; j < 4; j++) {
                cells[i][j] = 0;
                let cell = document.getElementById(`cell`+i+'-'+j);
                cell.style.top = getPosTop(i, j)+'px';
                cell.style.left = getPosLeft(i, j)+'px';
            }
        }
        updateCellView();
    }

    function updateCellView() {
        let remove = document.getElementsByClassName("number-cell");
        for (let i = 0; i < remove.length;) {
                let ncell = remove[i];
                ncell.parentNode.removeChild(ncell);
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let number = document.createElement('div');
                number.className = 'number-cell';
                number.id = "number-cell"+i+'-'+j;
                frame.appendChild(number);
                let numberCell = document.getElementById(`number-cell`+i+'-'+j);
                if (cells[i][j] === 0) {
                    numberCell.style.width = "0px";
                    numberCell.style.height = "0px";
                    numberCell.style.top = getPosTop(i,j) + 50 + 'px';
                    numberCell.style.left = getPosLeft(i,j) + 50 + 'px';
                }else {
                    numberCell.style.width = "100px";
                    numberCell.style.height = "100px";
                    numberCell.style.top = getPosTop(i,j) +'px';
                    numberCell.style.left = getPosLeft(i,j) +'px';
                    numberCell.style.backgroundColor = getNumBackgroundColor(cells[i][j]);
                    numberCell.style.color = getNumColor(cells[i][j]);
                    numberCell.textContent = cells[i][j];
                }
            }
        }
    }
    
    function generateNum() {
        let randomNum = Math.random() < 0.5 ? 2 : 4;
        let randX = Math.floor(Math.random()*4);
        let randY = Math.floor(Math.random()*4);
        while (true) {
            if (cells[randX][randY] === 0) {
                break;
            }
            randX = Math.floor(Math.random()*4);
            randY = Math.floor(Math.random()*4);
        }
        cells[randX][randY] = randomNum;
        drawNumStyle(randX,randY,randomNum);
    }

    document.onkeydown = function (event) {
        var event = event || window.event;
        event.preventDefault();
        switch (event.keyCode) {
            case 37:
                if (moveLeft()) {
                    var audio = document.createElement("audio");
                    audio.src = "./music/m1.mp3";
                    audio.play();
                    window.setTimeout(generateNum,500);
                    window.setTimeout(isGameOver,800);
                }
                break;
            case 38:
                if(moveUp()) {
                    var audio = document.createElement("audio");
                    audio.src = "./music/m1.mp3";
                    audio.play();
                    window.setTimeout(generateNum,500);
                    window.setTimeout(isGameOver,800);
                }
                break;
            case 39:
                if(moveRight()) {
                    var audio = document.createElement("audio");
                    audio.src = "./music/m1.mp3";
                    audio.play();
                    window.setTimeout(generateNum,500);
                    window.setTimeout(isGameOver,800);
                }
                break;
            case 40:
                if(moveDown()) {
                    var audio = document.createElement("audio");
                    audio.src = "./music/m1.mp3";
                    audio.play();
                    window.setTimeout(generateNum,500);
                    window.setTimeout(isGameOver,800);
                }
                break;
        }
    };

    function moveLeft() {
        if (!canMoveLeft(cells)) {
            return false;
        }
        for (let i = 0;i<4;i++){
            for (let j = 1;j<4;j++){
                if (cells[i][j] !== 0) {
                    for (let k = 0;k<j;k++){
                        if(cells[i][k] === 0 && noBlockHorizontal(i,k,j,cells)){
                            showMoveAnimation(i,j,i,k);

                            cells[i][k] = cells[i][j];
                            cells[i][j] = 0;
                        }else if(cells[i][k] === cells[i][j] && noBlockHorizontal(i,k,j,cells)){
                            var audio = document.createElement("audio");
                            audio.src = "./music/m2.mp3";
                            audio.play();
                            showMoveAnimation(i,j,i,k);
                            cells[i][k] += cells[i][j];
                            cells[i][j]= 0;

                            score += cells[i][k];
                            upScore(score);
                        }
                    }
                }
            }
        }
        window.setTimeout(updateCellView,200);
        return true;
    }
    function moveUp() {
        if (!canMoveUp(cells)) {
            return false;
        }
        for (let j = 0;j < 4;j++) {
            for (let i = 1; i < 4; i++) {
                if (cells[i][j] !== 0) {
                    for (var k = 0; k < i; k++) {
                        if (cells[k][j] === 0 && noBlockVertical(j, k, i, cells)) {
                            showMoveAnimation(i, j, k, j);
                            cells[k][j] = cells[i][j];
                            cells[i][j] = 0;
                        } else if (cells[k][j] === cells[i][j] && noBlockVertical(j, k, i, cells)) {
                            var audio = document.createElement("audio");
                            audio.src = "./music/m2.mp3";
                            audio.play();
                            showMoveAnimation(i,j,k,j);
                            cells[k][j] += cells[i][j];
                            cells[i][j] = 0;
                            score += cells[k][j];
                            upScore(score);
                        }
                    }
                }
            }
        }
        window.setTimeout(updateCellView, 200);
        return true;
    }
    function moveRight() {
        if (!canMoveRight(cells)) {
            return false;
        }
        for (let i = 0;i<4;i++) {
            for (let j = 2; j >= 0; j--) {
                if (cells[i][j] !== 0) {
                    for (let k = 3; k > j; k--) {
                        if (cells[i][k] === 0 && noBlockHorizontal(i, j, k, cells)) {
                            showMoveAnimation(i,j,i,k);

                            cells[i][k] = cells[i][j];
                            cells[i][j] = 0;
                        } else if (cells[i][k] === cells[i][j] && noBlockHorizontal(i, j, k, cells)) {
                            var audio = document.createElement("audio");
                            audio.src = "./music/m2.mp3";
                            audio.play();
                            showMoveAnimation(i,j,i,k);
                            cells[i][k] += cells[i][j];
                            cells[i][j] = 0;
                            score += cells[i][k];
                            upScore(score);
                        }
                    }
                }
            }
        }
        window.setTimeout(updateCellView,200);
        return true;
    }
    function moveDown() {
        if (!canMoveDown(cells)) {
            return false;
        }
        for (let j = 0;j < 4;j++) {
            for (let i = 2; i >= 0; i--) {
                if (cells[i][j] !== 0) {
                    for (var k = 3; k > i; k--) {
                        if (cells[k][j] === 0 && noBlockVertical(j, i, k, cells)) {
                            showMoveAnimation(i, j, k, j);
                            cells[k][j] = cells[i][j];
                            cells[i][j] = 0;
                        } else if (cells[k][j] === cells[i][j] && noBlockVertical(j, i, k, cells)) {
                            var audio = document.createElement("audio");
                            audio.src = "./music/m2.mp3";
                            audio.play();
                            showMoveAnimation(i,j,k,j);
                            cells[k][j] += cells[i][j];
                            cells[i][j] = 0;
                            score += cells[k][j];
                            upScore(score);
                        }
                    }
                }
            }
        }
        window.setTimeout(updateCellView, 200);
        return true;
    }

    function isGameOver(){
        if(nospace(cells) && nomove(cells)){
            gameOver();
        }
    }
    var startX,startY,endX,endY;
    document.addEventListener("touchstart",function(e){
        var e = event || arguments[0];
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
    });
    document.addEventListener("touchend",function(e){
        var e = event || arguments[0];
        endX = e.changedTouches[0].pageX;
        endY = e.changedTouches[0].pageY;
        var x = endX - startX;
        var y = endY - startY;
        var absX = Math.abs(x)>Math.abs(y);
        var absY = Math.abs(y)>Math.abs(x);
        if (x>0 && absX) {
            if (moveRight()) {
                var audio = document.createElement("audio");
                audio.src = "./music/m1.mp3";
                audio.play();
                setTimeout(generateNum,500);
                setTimeout(isGameOver,800);
            }
        }else if (x<0 && absX) {
            if (moveLeft()) {
                var audio = document.createElement("audio");
                audio.src = "./music/m1.mp3";
                audio.play();
                setTimeout(generateNum,500);
                setTimeout(isGameOver,800);
            }
        }else if (y>0 && absY) {
            if (moveDown()) {
                var audio = document.createElement("audio");
                audio.src = "./music/m1.mp3";
                audio.play();
                setTimeout(generateNum,500);
                setTimeout(isGameOver,800);
            }
        }else if (y<0 && absY) {
            if (moveUp()) {
                var audio = document.createElement("audio");
                audio.src = "./music/m1.mp3";
                audio.play();
                setTimeout(generateNum,500);
                setTimeout(isGameOver,800);
            }
        }
    });
};