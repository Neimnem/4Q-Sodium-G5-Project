const colors = ['teal', 'lightblue', 'pink', 'lightyellow']; 
let simonSequence = [];  
let score = 0;           
let clickable = false;   
let userSequence = [];  
let highScore = 0;
let flashSpeed = 200;
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

highScoreDisplay.innerHTML = "High Score: " + highScore;

// Function para i flash ang  panel
function flash(color) {
    const panel = document.querySelector('.' + color);    
    panel.style.filter = 'brightness(1.5)';               
    setTimeout(function () {
        panel.style.filter = 'brightness(1)';             
    }, 200); 
}

// Turn ni Simon: add new color + i-play ang buong sequence
function playSimon() {
    clickable = false;
    userSequence = [];
    turnIndicator.innerText = "Simon's Turn...";

    for (let j = 0; j < 5; j++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        simonSequence.push(randomColor);
    }

    for (let i = 0; i < simonSequence.length; i++) {
        setTimeout(function () {
            flash(simonSequence[i]);
        }, i * flashSpeed);
    }

    setTimeout(function () {
        clickable = true;
        turnIndicator.innerText = "Your Turn!";
    }, simonSequence.length * flashSpeed);
}

// Function pto handle the clicks of user in panel
function handleUserClick(e) {
    if (!clickable) return;

    const color = e.target.getAttribute('data-color'); 
    userSequence.push(color);                          

    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] != simonSequence[i]) {
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

// Function para i-update ang score at high score
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

// Function para matapos ang game kapag nagkamali si user
function endGame() {
    clickable = false;  
    gameOverText.innerHTML = `Game Over<br>Final Score: ${score}<br>High Score: ${highScore}`;
    gameOverScreen.style.display = 'flex';  
    startButton.style.display = 'block';    
}

// Play Again button functions
document.getElementById('play-again').addEventListener('click', function () {
    resetGame();                      
    gameOverScreen.style.display = 'none'; 
});

// Resets all the game values
function resetGame() {
    simonSequence = [];
    userSequence = [];
    score = 0;
    clickable = false;
    flashSpeed = 600; 
    updateScore();
}

// Add event listener for eachh panel
panels.forEach(function (panel) {
    panel.addEventListener('click', handleUserClick); 
});

// Start button function
startButton.addEventListener('click', function () {
    startButton.style.display = 'none'; 
    resetGame();                        
    playSimon();                       
});
