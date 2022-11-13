"use strict";

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new-game");
const btnRoll = document.querySelector(".btn-roll-dice");
const btnHold = document.querySelector(".btn-hold");
const score1 = document.querySelector("#score--0");
const score2 = document.querySelector("#score--1");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");
const notMoving = document.querySelector(".buttons-section");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");

diceEl.classList.add("hidden");
let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;
const maxScore = 10;

// const fairPlay = document.querySelector(".player-1").classList.contains("player-active");

const startNewGame = function () {
    diceEl.classList.add("hidden");
    score1.textContent = 0;
    score2.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    currentScore = 0;
    scores = [0, 0];
    activePlayer = 0;

    player1.textContent = "Player 1";
    player2.textContent = "Player 2";

    document.querySelector("#player-0").classList.add("player-active");
    document.querySelector("#player-1").classList.remove("player-active");

    document.querySelector("#player-0").classList.remove("player-winner");
    document.querySelector("#player-1").classList.remove("player-winner");

    btnRoll.disabled = false;
    btnHold.disabled = false;
    notMoving.classList.remove("not-moving");
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

const rollDice = function () {
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
    notMoving.classList.add("not-moving");
};

const winnerIsPlayer1 = function () {
    player1.textContent = "Winner";
    document.querySelector(".player-0").classList.add("player-winner");
    disable(btnRoll);
    disable(btnHold);
};

const winnerIsPlayer2 = function () {
    player2.textContent = "Winner";
    document.querySelector(".player-1").classList.add("player-winner");
    disable(btnRoll);
    disable(btnHold);
};

const holdScore = function () {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

    if (
        scores[0] >= maxScore &&
        scores[0] > scores[1] &&
        document.querySelector(".player-1").classList.contains("player-active")
    ) {
        winnerIsPlayer1();
    } else if (
        scores[1] >= maxScore &&
        scores[1] > scores[0] &&
        document.querySelector(".player-1").classList.contains("player-active")
    ) {
        winnerIsPlayer2();
    } else {
        switchPlayer();
    }
};

btnRoll.addEventListener("click", rollDice);

btnHold.addEventListener("click", holdScore);

btnNew.addEventListener("click", startNewGame);
