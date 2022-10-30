// declare the winning number;
const winningNum = Math.floor(Math.random() * 100 + 1);

// declare placeholder variables for hint text;
let hint1Text = '';
let hint2Text = '';
let hint3Text = '';

// declare random number variable to use in creating hint1;
let randomHintNum = Math.floor(Math.random() * 100 + 1);

// check if randomHintNum is within a certain range/the same as the winning number.
// and if it isn't, then reroll it;
while (randomHintNum === winningNum || randomHintNum < 10 || randomHintNum > 90) {
    randomHintNum = Math.floor(Math.random() * 100 + 1);
}

// if randomHint is greater than winning number set hint1Text to "x ≥ randomHintNum",
// otherwise set it to "x ≤ randomHintNum";
if (winningNum > randomHintNum) {
    hint1Text = `x ≥ ${randomHintNum}`;
} else {
    hint1Text = `x ≤ ${randomHintNum}`;
}

// if the winning number is odd, set hint2Text to "x is odd",
// otherwise set it to "x is even";
if (winningNum % 2) {
    hint2Text = "x is odd";
} else {
    hint2Text = "x is even";
}

// declare variables for a random number between 10-15 less than winningNum &
// a random number between 10-15 greater than winningNum;
let randomLesser = winningNum - (Math.floor(Math.random() * 6 + 10));
let randomGreater = winningNum + (Math.floor(Math.random() * 6 + 10));
// check if the random numbers are within desired range (i.e. 1-100),
// and if they aren't set them to the lowest/highest potential values;
if (randomLesser < 1) {
    randomLesser = 1;
}
if (randomGreater > 100) {
    randomGreater = 100;
}

// set hint3Text
hint3Text = `${randomLesser} ≤ x ≤ ${randomGreater}`;

// declare varialbes referring to the document's hintboxes and their text;
const hint1TextEl = document.querySelector('.hint1');
const hint2TextEl = document.querySelector('.hint2');
const hint3TextEl = document.querySelector('.hint3');
const hintbox1El = document.querySelector('.hintbox1');
const hintbox2El = document.querySelector('.hintbox2');
const hintbox3El = document.querySelector('.hintbox3');

// declare function that reveals hints when their corresponding box is the target of an event;
function revealHint(event) {
    if (event.target.matches('.hintbox1')) {
        hintbox1El.style.backgroundImage = "url('./images/hintbox_clicked.png')";
        hint1TextEl.textContent = hint1Text;
    }
    if (event.target.matches('.hintbox2')) {
        hintbox2El.style.backgroundImage = "url('./images/hintbox_clicked.png')";
        hint2TextEl.textContent = hint2Text;
    }
    if (event.target.matches('.hintbox3')) {
        hintbox3El.style.backgroundImage = "url('./images/hintbox_clicked.png')";
        hint3TextEl.textContent = hint3Text;
    }
}

// declare variable referring to the element that contains the hintboxes;
const hintAreaEl = document.querySelector('#hints');
// add event listener to that element that will listen for the "click" event,
// and run the revealHint function in response;
hintAreaEl.addEventListener('click', revealHint);

// declare empty array varialbe to hold the player's guesses;
const prevGuesses = [];
// declare variables referring to elements in the document for use later;
const guessBoxEls = document.querySelectorAll('.guessBox');
const highLowEls = document.querySelectorAll('.highLow');
const inputEl = document.querySelector('#number');
const winScreenEl = document.querySelector('.win');
const loseScreenEl = document.querySelector('.lose');

// declare function that checks the player's guess and determines the appropriate response;
function guessChecker(guess) {
    // declare variable to hold the player's current guess as a number value;
    const currentGuess = Number(guess);
    // check if player's submission was empty,
    // and if so, stops the function from running so that there is no response;
    if (!inputEl.value) {
        return;
    }
    // checks if the player already guessed the submitted number,
    // and if so, stops the function from running so that there is no response;
    for (let i = 0; i < prevGuesses.length; i++) {
        if(currentGuess === prevGuesses[i]) {
            return
        }
    }
    // adds the currentGuess to our array variable that holds the player's guesses,
    // (i.e. records the player's guesses);
    prevGuesses.push(currentGuess);
    // declare a variable referring to a guessBox element based on the current number of guesses;
    const currentGuessBoxEl = guessBoxEls[prevGuesses.length - 1];
    // set the text of the current guessBox element to the value of the current guess;
    currentGuessBoxEl.textContent = currentGuess;

    // if the player's guess matches the winningNum,
        // reveal the victory screen and reset button,
        // set the guessBox background to the winning guessBox image,
        // remove event listeners from hints and disable the submission form;
    // else, check if there have been 4 or less guesses;
        // if so, check to see if the currentGuess is within 20 of winningNum,
        // apply "hot" guessBox image if yes and "cold" image if no;
        // check if currentGuess is lower than winningNum,
        // if yes, show up arrow indicator ('⮝') next to guessBox,
        // if no, show down arrow indicator ('⮟');
    // else, reveal the losing screen and reset button,
        // X out all of the guessBoxes, remove arrow indicators,
        // remove event listeners from hints and disable the submission form;
    if (currentGuess === winningNum) {
        //you win
        winScreenEl.classList.toggle('hidden');
        resetButtonEl.classList.toggle('hidden');
        currentGuessBoxEl.style.backgroundImage = "url('./images/winBox.png')";
        hintAreaEl.removeEventListener('click', revealHint);
        inputEl.disabled = true;
    } else if (prevGuesses.length <= 4) {
        const currentHighLowEl = highLowEls[prevGuesses.length - 1];
        if (winningNum - 20 <= currentGuess && currentGuess <= winningNum + 20) {
            currentGuessBoxEl.style.backgroundImage = "url('./images/hotBox.png')";
        } else {
            currentGuessBoxEl.style.backgroundImage = "url('./images/coldBox.png')";
        }
        if (currentGuess < winningNum) {
            //do something to show that winningNum is higher
            currentHighLowEl.textContent = '⮝';
        } else {
            //do something to show that winningNum is lower
            currentHighLowEl.textContent = '⮟';
        }
    } else {
        //you lose
        for (guesses of guessBoxEls) {
            guesses.textContent = '';
            guesses.style.backgroundImage = "url('./images/X.png')";
        }
        for (highLow of highLowEls) {
            highLow.textContent = '';
        }
        loseScreenEl.classList.toggle('hidden');
        resetButtonEl.classList.toggle('hidden');
        hintAreaEl.removeEventListener('click', revealHint);
        inputEl.disabled = true;
    }
    // reset the submission form;
    inputEl.value = '';
}

// declare variable referring to the document's form element;
const formEl = document.querySelector('#submission');

// add event listener to form element,
// blocks default submit action,
// runs guessChecker function using player's guess as argument;
formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    guessChecker(inputEl.value);
})

// declare variable reffering to reset button;
const resetButtonEl = document.querySelector('.reset');

// add event listener to reset button to reload game if clicked;
resetButtonEl.addEventListener('click', function(event) {
    if (event.target.matches('.reset')) {
        location.reload();
    }
});

// declare variables for yes/no buttons on results screens;
const yesButtonEls = document.querySelectorAll('.yes');
const noButtonEls = document.querySelectorAll('.no');

// add event listeners to yes/no buttons,
// yes buttons will reload game,
// no buttons will re-hide results screen,
// allowing player to view finished game;
yesButtonEls[0].addEventListener('click', function(event) {
    if (event.target.matches('.yes')) {
        location.reload();
    }
});

yesButtonEls[1].addEventListener('click', function(event) {
    if (event.target.matches('.yes')) {
        location.reload();
    }
});

noButtonEls[0].addEventListener('click', function(event) {
    if (event.target.matches('.no')) {
        winScreenEl.classList.toggle('hidden');
    }
});

noButtonEls[1].addEventListener('click', function(event) {
    if (event.target.matches('.no')) {
        loseScreenEl.classList.toggle('hidden');
    }
});