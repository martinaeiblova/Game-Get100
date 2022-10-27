"use strict";

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new-game");
const btnRoll = document.querySelector(".btn-roll-dice");
const btnHold = document.querySelector(".btn-hold");
const score1 = document.querySelector("#score--0");
const score2 = document.querySelector("#score--1");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");

diceEl.classList.add("hidden");
let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;

const startNewGame = function () {
    diceEl.classList.add("hidden");
    score1.textContent = 0;
    score2.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    currentScore = 0;
    scores = [0,0];
    document.querySelector(`.player--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
    }`;
    document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-winner");
    //disable(btnRoll);
    //disable(btnHold);
    btnRoll.disabled = false;
    btnHold.disabled = false;
};

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    document
        .getElementById(`player-${activePlayer}`)
        .classList.remove("player-active");
    activePlayer = activePlayer === 0 ? 1 : 0;
    document
        .getElementById(`player-${activePlayer}`)
        .classList.add("player-active");
};

const disable = function (x) {
    x.disabled = true;
};

// click btnRoll: generate random number, displey this number
// když je 1 - switch player
// když jiné číslo - add dice roll (randNum) to current score
//                 - display new score

btnRoll.addEventListener("click", function () {
    const randNum = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randNum}.png`;
    if (randNum != 1) {
        currentScore += randNum;
        document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;
    } else {
        switchPlayer();
    }
});

// click btnHold: currentScore will be score, přičte se k celkovému score
//                když je 100..vítěz, když není:
//                currentScore will be 0
//                switch player

btnHold.addEventListener("click", function () {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

    if (scores[activePlayer] >= 10) {
        document.querySelector(
            `.player--${activePlayer}`
        ).textContent = `Player ${activePlayer + 1} is a winner.`;
        document
            .querySelector(`.player-${activePlayer}`)
            .classList.add("player-winner");
        disable(btnRoll);
        disable(btnHold);
    } else {
        switchPlayer();
    }
});

btnNew.addEventListener("click", startNewGame);
