"use strict";

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new-game");
const btnRoll = document.querySelector(".btn-roll-dice");
const btnHold = document.querySelector(".btn-hold");
const score1El = document.querySelector("#score--0");
const score2El = document.querySelector("#score--1");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");

diceEl.classList.add("hidden");
let currentScore = 0;
const scores = [0, 0];
let activePlayer = 0;

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
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
    }
});
