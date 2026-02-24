/**
 * Author: Rafael Negrete Fonseca
 * Date: 2/23/2026
 * GitHub URL: https://github.com/rnegrete01/js_hot_cold_game
 */

"use strict";

// global variables
let randomNum = 0;
let tries = 0;
const messageLabel = document.querySelector("#message");
const history = document.querySelector("#history");

// helper function
const getRandomInt = (max = 100) => {
    let num = Math.random() * max;  // get a random number between 0 and max
    num = Math.ceil(num);           // round up to nearest integer
    return num;
};

randomNum = getRandomInt();

// event handler functions
const guessClick = () => {
    const guess = parseInt(document.querySelector("#number").value);
    let message = "";

    const guessHistory = () => {
        tries ++;
        history.innerHTML += `Guess ${tries}: ${guess} - ${message}<br>`
    }
    guessHistory()

    /**
     * I nested my switch inside a breakme block and here's why:
     * I couldn't figure out where to put the switch statement.
     * I couldn't think of anywhere else to put it but inside the guess
     * click button. I looked it up and figured out a way to break out
     * of an 'if' statement so that I wouldn't continue to the switch if data invalid.
     * Here is the link where I got the answer from (no AI like debbie said)
     * URL: https://stackoverflow.com/questions/4851657/call-break-in-nested-if-statements
     */

    //Input Data Validation
    breakme:{
        if (isNaN(guess)) {
            message = "Not a valid number. Please enter a valid number."
            break breakme;
        } else if (guess < 1 || guess > 100) {
            message = "Invalid number. Enter a number between 1 and 100.";
            break breakme;
        }

        let distance = randomNum - guess;
        if (distance < 0) { //we need a positive number for distance. Negatives always smaller = bad.
            distance *= -1;
        }

        let color = ""
        switch (true) {
            case (distance === 0):
                const lastWord = (tries === 1) ? "try" : "tries";
                message = `Bingo! You guessed it in ${tries} ${lastWord}!`;
                color = "green";
                break;
            case (distance <= 5):
                message = "Hot! You are within 5!"
                color = "red"
                break;
            case (distance <= 10):
                message = "Warmer!";
                color = "orangered";
                break;
            case (distance <= 20):
                message = "Warm!"
                color = "orange"
                break;
            case (distance <= 30):
                message = "Cold!"
                color = "lightblue"
                break;
            case (distance <= 40):
                message = "Colder!"
                color = "blue"
                break;
            default:
                color = "darkblue"
                message = "Your way off!";
        }

        messageLabel.style.color = color
    }
    document.querySelector("#message").textContent = message;
};

const playAgainClick = () => {
    randomNum = getRandomInt();
    tries = 0;
    document.querySelector("#number").value = "";
    document.querySelector("#message").textContent = "";
    console.log(randomNum)
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#guess").addEventListener(
        "click", guessClick);
    // Enable "enter" key
    document.querySelector("#number").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            guessClick();
        }
    })

});

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#play_again").addEventListener(
        "click", playAgainClick);
});

console.log(randomNum)
