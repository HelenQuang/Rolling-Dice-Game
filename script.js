'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); //Use # to select ID, use . to select class
const score1El = document.getElementById('score--1'); //Can select Id by using this way
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; //Have to declare first, outside the below function

//Setting initial condition
const init = function () {
  scores = [0, 0]; //Store the scores of player 0 and player 1
  currentScore = 0;
  activePlayer = 0;
  playing = true; //Define the state of the game is playin or not

  score0El.textContent = 0; //JS will automatically convert 0 to string
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//Set up switch player function to use later, do not repeat yourself
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //Allow to switch activePlayer from 0 to 1

  player0El.classList.toggle('player--active'); //Toggle is used to add the class if it's not there & remove it
  player1El.classList.toggle('player--active');
};

//Rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //The state of the game is changed to playing
    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; //To roll a random number between 1 and 6

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1:
    if (dice !== 1) {
      //Add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //To select the score element dynamically based on which is the active player right now.
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//Holding current score
btnHold.addEventListener('click', function () {
  if (playing) {
    //The state of the game is changed to playing
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false; //The state of the game is changed to not playing
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

//Reseting the game
btnNew.addEventListener('click', init);
