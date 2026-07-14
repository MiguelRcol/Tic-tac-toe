const PLAYER_X = "X";
const PLAYER_O = "O";

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
const winnerMessage = document.getElementById("winnerMessage");
const scoreXDisplay = document.getElementById("scoreX");
const scoreODisplay = document.getElementById("scoreO");

let currentPlayer = PLAYER_X;
let gameActive = true;
let board = Array(9).fill("");

let scoreX = 0;
let scoreO = 0;

function handleCellClick(event) {
    const clickedCell = event.currentTarget;
    const clickedIndex = Number(clickedCell.dataset.index);

    if (!gameActive || board[clickedIndex] !== "") {
        return;
    }

    board[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(`player-${currentPlayer.toLowerCase()}`);

    const winningCombination = findWinningCombination();

    if (winningCombination) {
        handleWin(winningCombination);
        return;
    }

    if (checkDraw()) {
        handleDraw();
        return;
    }

    switchPlayer();
}

function findWinningCombination() {
    return winningCombinations.find(combination => {
        const [a, b, c] = combination;

        return (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        );
    });
}

function checkDraw() {
    return board.every(cell => cell !== "");
}

function handleWin(winningCombination) {
    gameActive = false;

    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    winnerMessage.textContent = "Press Reset Game to play another round.";

    winningCombination.forEach(index => {
        cells[index].classList.add("winner");
    });

    updateScore();
}

function handleDraw() {
    gameActive = false;

    statusDisplay.textContent = "It's a draw!";
    winnerMessage.textContent = "Press Reset Game to try again.";
}

function updateScore() {
    if (currentPlayer === PLAYER_X) {
        scoreX++;
        scoreXDisplay.textContent = scoreX;
    } else {
        scoreO++;
        scoreODisplay.textContent = scoreO;
    }
}

function switchPlayer() {
    currentPlayer =
        currentPlayer === PLAYER_X
            ? PLAYER_O
            : PLAYER_X;

    statusDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function resetGame() {
    board = Array(9).fill("");
    currentPlayer = PLAYER_X;
    gameActive = true;

    statusDisplay.textContent = `Current Player: ${currentPlayer}`;
    winnerMessage.textContent = "";

    cells.forEach(cell => {
        cell.textContent = "";

        cell.classList.remove(
            "player-x",
            "player-o",
            "winner"
        );
    });
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);