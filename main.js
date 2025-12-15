let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const playerTurnEl = document.getElementById('player-turn');

let turno = true;
let gameOver = false;
let currentPlayer = 'Player One';

const symbolForTurno = () => (turno ? "O" : "X");
const updateTurnLabel = () => {
    if (playerTurnEl) playerTurnEl.innerText = currentPlayer;
};

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

const resetGame = () => {
    turno = true;
    gameOver = false;
    currentPlayer = 'Player One';
    enableBoxes();
    msgContainer.classList.add("msg-container");
    if (msg) msg.innerText = "";
    updateTurnLabel();
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText.trim() !== "") return;
        if (turno) {
            box.innerText = "O";
            currentPlayer = 'Player Two';
            turno = false;
        } else {
            box.innerText = "X";
            currentPlayer = 'Player One';
            turno = true;
        }
        box.disabled = true;
        checkWinner();
        if (!gameOver) updateTurnLabel();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};


const showWinner = (winnerSymbol) => {
    const winnerName = (winnerSymbol.toUpperCase() === "O") ? "Player One" : "Player Two";
    if (msg) msg.innerText = `Winner is ${winnerName}`;
    if (msgContainer) msgContainer.classList.remove("msg-container");
    disableBoxes();
    gameOver = true;
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
};
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);