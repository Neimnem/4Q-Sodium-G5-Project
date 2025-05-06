const colors = ['teal', 'lightblue', 'pink', 'lightyellow'];
let simonSequence = [];
let score = 0;
let clickable = false;
let userSequence = [];
let highScore;
if (localStorage.getItem("highScore")) {
    highScore = parseInt(localStorage.getItem("highScore"));
} else {
    highScore = 0;
}

const turnIndicator = document.getElementById('turn-indicator');
const panels = document.querySelectorAll('.panel');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over');
const gameOverText = document.getElementById('game-over-text');
const resetHighScoreBtn = document.getElementById('reset-highscore');

// Display loaded high score
highScoreDisplay.innerHTML = "High Score: " + highScore;

// Flash a color panel
function flash(color) {
    const panel = document.querySelector('.' + color);
    panel.style.filter = 'brightness(1.5)';
    setTimeout(function () {
        panel.style.filter = 'brightness(1)';
    }, 300);
}

// Simon's turn: add new color + play full sequence
function playSimon() {
    clickable = false;
    userSequence = [];
    turnIndicator.innerText = "Simon's Turn...";

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    simonSequence.push(randomColor);

    for (let i = 0; i < simonSequence.length; i++) {
        setTimeout(function () {
            flash(simonSequence[i]);
        }, i * 600); 
    }

    setTimeout(function () {
        clickable = true;
        turnIndicator.innerText = "Your Turn!";
    }, simonSequence.length * 600);
}

// Handle user's color click
function handleUserClick(e) {
    if (!clickable) return;
    const color = e.target.getAttribute('data-color');
    userSequence.push(color);

    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== simonSequence[i]) {
            endGame();
            return;
        }
    }

    score++;
    updateScore();

    if (userSequence.length == simonSequence.length) {
        setTimeout(function () {
            playSimon();
        }, 1000);
    }
}

// Update score and high score
function updateScore() {
    scoreDisplay.innerHTML = "Score: " + score;
    scoreDisplay.style.transition = "color 0.3s";
    scoreDisplay.style.color = "yellow";
    setTimeout(function () {
        scoreDisplay.style.color = "white";
    }, 300);

    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerHTML = "High Score: " + highScore;
        localStorage.setItem("highScore", highScore); 
    }
}

// End game
function endGame() {
    clickable = false;
    gameOverText.innerHTML = `Game Over<br>Final Score: ${score}<br>High Score: ${highScore}`;
    gameOverScreen.style.display = 'flex';
    startButton.style.display = 'block';
}

// Reset game data
function resetGame() {
    simonSequence = [];
    userSequence = [];
    score = 0;
    clickable = false;
    updateScore();
}

// Play again button
document.getElementById('play-again').addEventListener('click', function () {
    resetGame();
    gameOverScreen.style.display = 'none';
});

// Panel click listeners
panels.forEach(function (panel) {
    panel.addEventListener('click', handleUserClick);
});

// Start game
startButton.addEventListener('click', function () {
    startButton.style.display = 'none';
    resetGame();
    playSimon();
});
