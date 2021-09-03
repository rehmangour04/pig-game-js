
'use strict';
 
//Starting conditions
let activePlayer = 0;
let randonDiceNumber;
let currentScore = 0;
let newScore = 0;
let score = 0;
let finalScore = [0, 0];
let playerWon = false;
document.querySelector(`#score--0`).textContent = '0';
document.querySelector(`#score--1`).textContent = '0';
document.querySelector(`.dice`).classList.add('hidden');
 
function reset() {
  document.querySelector(`#score--0`).textContent = '0';
  document.querySelector(`#score--1`).textContent = '0';
  document.querySelector(`#current--0`).textContent = '0';
  document.querySelector(`#current--1`).textContent = '0';
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document
    .querySelector(`.player--1`)
    .classList.remove('player--active', 'player--winner');
  document.querySelector(`.dice`).classList.add('hidden');
  playerWon = false;
  score = 0;
  finalScore = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  newScore = 0;
}
 
//Active Player check
function switchingActivePlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  return activePlayer;
}
 
//Active Player BG Toggle
function playerBGToggle() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
}
 
//Current check
function currentCheck(score) {
  document.querySelector(`#current--${activePlayer}`).textContent = score;
}
 
//Score Check
function scoreCheck(newScore) {
  document.querySelector(`#score--${activePlayer}`).textContent = newScore;
}
 
//Random number generation
function generateRandomNumber() {
  randonDiceNumber = Math.trunc(Math.random() * 6 + 1);
  return randonDiceNumber;
}
 
//Roll button functionality
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playerWon === false) {
    generateRandomNumber();
    document.querySelector('.dice').classList.remove('hidden');
    document.querySelector('.dice').src = `dice-${randonDiceNumber}.png`;
    if (randonDiceNumber === 1) {
      score = 0;
      playerBGToggle();
      currentCheck(score);
      switchingActivePlayer();
      playerBGToggle();
    } else {
      score += randonDiceNumber;
      currentCheck(score);
    }
  }
});
 
//Hold button functionality
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playerWon === false) {
    finalScore[activePlayer] += score;
    if (finalScore[activePlayer] < 20) {
      playerBGToggle();
      scoreCheck(finalScore[activePlayer]);
      score = 0;
      currentCheck(score);
      switchingActivePlayer();
      playerBGToggle();
    } else {
      playerWon = true;
      document.querySelector(`.dice`).classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      scoreCheck(score);
      score = 0;
      currentCheck(score);
    }
  }
});
 
//New game button functionality
document.querySelector('.btn--new').addEventListener('click', function () {
  reset();
});

// This is a trial update