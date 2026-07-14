const playerX = "X";
const playerO = "O";
let currentPlayer = playerX;
let gameActive = true;
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");

function handleCellClick(event) {
    const clickedCell = event.target;

    if (clickedCell.textContent !== "" || !gameActive) {
        return;
    }

    clickedCell.textContent = currentPlayer;
    checkWin();
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    statusDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function checkWin() {
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

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            statusDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
    }
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick)); 

resetButton.addEventListener("click", () => {
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = playerX;
    gameActive = true;
    statusDisplay.textContent = `Current Player: ${currentPlayer}`;
});