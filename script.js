document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.game-btn');
  const startButton = document.getElementById('start-button');
  const status = document.getElementById('status');
  const score = document.getElementById('score');

  const colors = ['red', 'green', 'blue', 'yellow'];
  let sequence = [];
  let userSequence = [];
  let round = 1;
  let currentScore = 0;
  let isGameOver = false;
  let isSequencePlaying = false;

  // Sound for each color
  const sounds = {
    red: new Audio('sounds/red.mp3'),
    green: new Audio('sounds/green.mp3'),
    blue: new Audio('sounds/blue.mp3'),
    yellow: new Audio('sounds/yellow.mp3')
  };

  // Game logic to start a new round
  function startNewRound() {
    if (isGameOver) return;
    
    userSequence = [];
    sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    playSequence();
    updateStatus();
  }

  // Play the sequence with delay
  function playSequence() {
    isSequencePlaying = true;
    let index = 0;
    const interval = setInterval(() => {
      activateButton(sequence[index]);
      playSound(sequence[index]);
      index++;
      if (index === sequence.length) {
        clearInterval(interval);
        isSequencePlaying = false;
      }
    }, 1000);
  }

  // Handle button activation and sound
  function activateButton(color) {
    const button = document.getElementById(color);
    button.classList.add('active');
    setTimeout(() => {
      button.classList.remove('active');
    }, 500);
  }

  function playSound(color) {
    sounds[color].play();
  }

  // User input handling
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (isSequencePlaying || isGameOver) return;

      const color = button.id;
      userSequence.push(color);
      activateButton(color);
      playSound(color);

      checkUserInput();
    });
  });

  // Check the user's input against the sequence
  function checkUserInput() {
    const lastIndex = userSequence.length - 1;

    if (userSequence[lastIndex] !== sequence[lastIndex]) {
      gameOver();
    } else if (userSequence.length === sequence.length) {
      currentScore++;
      score.textContent = `Score: ${currentScore}`;
      round++;
      status.textContent = `Round: ${round}`;
      setTimeout(startNewRound, 1000);
    }
  }

  // Handle game over
  function gameOver() {
    isGameOver = true;
    alert(`Game Over! Final Score: ${currentScore}`);
    resetGame();
  }

  // Reset game state
  function resetGame() {
    sequence = [];
    userSequence = [];
    round = 1;
    currentScore = 0;
    status.textContent = `Round: 1`;
    score.textContent = `Score: 0`;
    isGameOver = false;
  }

  // Start button to initialize the game
  startButton.addEventListener('click', () => {
    if (isGameOver) {
      resetGame();
    }
    startNewRound();
  });
});
