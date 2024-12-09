class Test{

constructor(boardCanvas, bottomCanvas, topCanvas, endpoint) {
    this.topCanvas = topCanvas;
    this.ctxTop = topCanvas.getContext("2d");

    this.boardCanvas = boardCanvas;
    this.ctxBoard = boardCanvas.getContext("2d");

    this.bottomCanvas = bottomCanvas;
    this.ctxBottom = bottomCanvas.getContext("2d");

    this.gridSize = 15;

    //Für dasBoard
    this.fieldWidth = this.boardCanvas.width / 15;
    this.fieldHeight = this.boardCanvas.height / 15;
    this.squareSize = this.boardCanvas.width / this.gridSize; // Größe der einzelnen Felder

    //Für die Spieleranzeige
    this.fieldWidthPlayer = this.bottomCanvas.width / 15;
    this.fieldHeightPlayer = this.bottomCanvas.height / 15;
    this.squareSizePlayer = this.bottomCanvas.width / this.gridSize;

    this.drawTilesTop();
    this.drawScrabbleField();
    this.drawTilesBottom();

    this.boardCanvas.addEventListener("click", (event) => {
        if (this.isOver) return;

        const indexY = Math.floor(event.offsetY / this.fieldHeight) + 3;
        const indexX = Math.floor(event.offsetX / this.fieldWidth);
        const index = indexX.toString() + "*" + indexY.toString();
        console.log(`Clicked at X: ${indexX} Y: ${indexY} => ${index}`);
        fetch(endpoint, {method: "post", body: index}).catch(console.log);
    });
    this.bottomCanvas.addEventListener("click", (event) => {
        if (this.isOver) return;

        const indexY = Math.floor(event.offsetY / this.fieldHeight) + 18;
        const indexX = Math.floor(event.offsetX / this.fieldWidth);
        const index = indexX.toString() + "*" + indexY.toString();
        console.log(`Clicked at X: ${indexX} Y: ${indexY} => ${index}`);
        fetch(endpoint, {method: "post", body: index}).catch(console.log);
    });

    this.topCanvas.addEventListener("click", (event) => {
        if (this.isOver) return;

        const indexY = Math.floor(event.offsetY / this.fieldHeight);
        const indexX = Math.floor(event.offsetX / this.fieldWidth);
        const index = indexX.toString() + "*" + indexY.toString();
        console.log(`Clicked at X: ${indexX} Y: ${indexY} => ${index}`);
        fetch(endpoint, {method: "post", body: index}).catch(console.log);
    });
}
    drawTilesTop(){
        for(let i = 0; i < 7; i++){
            this.ctxTop.beginPath();
            this.ctxTop.fillStyle = "rgb(255, 192, 203)";
            this.ctxTop.fillRect(i * this.squareSizePlayer+4, (2*this.squareSizePlayer)-4, this.squareSizePlayer, this.squareSizePlayer);
            this.ctxTop.strokeStyle = "black"; 
            this.ctxTop.lineWidth = 2; 
            this.ctxTop.strokeRect(i * this.squareSizePlayer+4, (2*this.squareSizePlayer)-4, this.squareSizePlayer, this.squareSizePlayer);
        }
    }

    drawTilesBottom(){
        for(let i = 0; i < 7; i++){
            this.ctxBottom.beginPath();
            this.ctxBottom.fillStyle = "rgb(191, 245, 239)";
            this.ctxBottom.fillRect(i * this.squareSizePlayer+4, 4, this.squareSizePlayer, this.squareSizePlayer);
            this.ctxBottom.strokeStyle = "black"; 
            this.ctxBottom.lineWidth = 2; 
            this.ctxBottom.strokeRect(i * this.squareSizePlayer+4, 4, this.squareSizePlayer, this.squareSizePlayer);
        }
    }

    drawScrabbleField() {
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const x = col * this.squareSize;
                const y = row * this.squareSize;

                this.ctxBoard.beginPath();
                this.setColor(row, col);
                this.ctxBoard.fillRect(x, y, this.squareSize, this.squareSize);
                this.ctxBoard.strokeStyle = "black"; 
                this.ctxBoard.lineWidth = 1; 
                this.ctxBoard.strokeRect(x, y, this.squareSize, this.squareSize);
                this.setText(row, col);      
            }
        }
    }

    setColor(row, col) {
        const tripleWord = new Set(["0,0", "14,0", "0,14", "14,14", "0,7", "7,0", "14,7", "7,14"]);
        const doubleLetter = new Set(["3,0", "0,3", "0,11", "2,6", "6,2", "7,3", "8,2", "2,8", "3,7", "6,6", "8,6", "6,8", "8,8", "11,0", "11,7", "12,6", "6,12", "7,11", "8,12", "12,8", "3,14", "14,3", "14,11", "11,14"]);
        const tripleLetter = new Set(["1,5", "5,1", "1,9", "9,1", "8,8", "5,5", "5,9", "9,5", "9,9", "13,5", "13,9", "9,13", "5,13"]);
        const doubleWord = new Set(["1,1", "2,2", "3,3", "4,4", "7,7", "13,1", "12,2", "11,3", "10,4", "4,10", "3,11", "2,12", "1,13", "10,10", "11,11", "12,12", "13,13"]);

        const key = `${row},${col}`;

        // Wähle die Farbe basierend auf dem Feldtyp
        if (tripleWord.has(key)) {
            this.ctxBoard.fillStyle = "rgb(205, 38, 38)"; //rot: tw
        } else if (doubleLetter.has(key)) {
            this.ctxBoard.fillStyle = "rgb(173, 216, 230)"; //hellblau: dl
        } else if (tripleLetter.has(key)) {
            this.ctxBoard.fillStyle = "rgb(39, 64, 139)"; //dunkelblau: tl
        } else if (doubleWord.has(key)) {
            this.ctxBoard.fillStyle = "rgb(238, 174, 238)"; //rosa: dw
        } else {
            this.ctxBoard.fillStyle = "rgb(193, 255, 193)"; //sonst grün
        }
    }
        setText(row, col){
            const tripleWord = new Set(["0,0", "14,0", "0,14", "14,14", "0,7", "7,0", "14,7", "7,14"]);
            const doubleLetter = new Set(["3,0", "0,3", "0,11", "2,6", "6,2", "7,3", "8,2", "2,8", "3,7", "6,6", "8,6", "6,8", "8,8", "11,0", "11,7", "12,6", "6,12", "7,11", "8,12", "12,8", "3,14", "14,3", "14,11", "11,14"]);
            const tripleLetter = new Set(["1,5", "5,1", "1,9", "9,1", "8,8", "5,5", "5,9", "9,5", "9,9", "13,5", "13,9", "9,13", "5,13"]);
            const doubleWord = new Set(["1,1", "2,2", "3,3", "4,4", "7,7", "13,1", "12,2", "11,3", "10,4", "4,10", "3,11", "2,12", "1,13", "10,10", "11,11", "12,12", "13,13"]);
    
            const key = `${row},${col}`;
            const x = col * this.fieldWidth; 
            const y = row * this.fieldHeight; 

            this.ctxBoard.fillStyle = "white"; 
            this.ctxBoard.font = "bold 12px verdana, sans-serif";
            const textX = (x - 5) + this.fieldWidth / 4; 
            const textY = y + this.fieldHeight / 1.5; 

        // Zeichne Text
        if (tripleWord.has(key)) {
            this.ctxBoard.fillText("TW", textX, textY);
        }
        if (doubleLetter.has(key)) {
            this.ctxBoard.fillText(" DL", textX, textY);
        }
        if (tripleLetter.has(key)) {
            this.ctxBoard.fillText(" TL", textX, textY);
        }
        if (doubleWord.has(key)) {
            this.ctxBoard.fillText("DW", textX, textY);
        }
    }
}