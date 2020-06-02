// DOM's element : 
const alphabet = document.querySelectorAll('.letter');
const hangman = document.querySelector('.hangman');
const resetButton = document.querySelectorAll('button');
const letterGroup = document.querySelector('.letter-group');
const lineGroup = document.querySelector('.line-group');
const letterAnswer = document.querySelectorAll('.answer-letter');
const line = document.querySelectorAll('.line');
const winDialog = document.querySelector('.win');
const lostDialog = document.querySelector('.lost');
const container = document.querySelector('.container');

// Variables : 
const words = [
    "moteur",
    "administration",
    "voiture",
    "table",
    "grenade", 
    "arbre",
    "ordinateur",
    "blouson",
    "tasse",
    "cigarette"
];
let index = Math.floor(Math.random() * 10);
let answer = words[index].toUpperCase(); 
let countForWin = 1;
let countForLoose = 0;
const answerArray = [];
let isGameOver = false;

// Functions : 
const initGame = () => {
    /* Make an array from the answer where each index is one letter of the answer,
    and display as many underscore as there is letters */
    for(let i = 0; i < answer.length; i++) {
        answerArray[i] = answer.substring(i, i+1);
        const createDivLetter = document.createElement("div");
        letterGroup.appendChild(createDivLetter);
        createDivLetter.classList.add('answer-letter');
        const createDivLine = document.createElement("div");
        lineGroup.appendChild(createDivLine);
        createDivLine.classList.add('line');
    }
    // Show the first letter of this answer
    letterGroup.children[0].textContent = answerArray[0];
    
    // If the first letter added is also somewhere else in the word, show it as well 
    for(let i = 0; i < answer.length; i++) {
        if(answerArray[i].includes(letterGroup.children[0].textContent)) {       
            letterGroup.children[i].textContent = answerArray[i];
        } 
    }

    // Color in green the first letter added
    for(let i = 0; i < 26; i++) {
        if(alphabet[i].textContent == letterGroup.children[0].textContent) {
            alphabet[i].classList.add('good');
        }
    }
}

const isLetterInAnswer = (event) => {

    if(isGameOver) {
        return;
    }

    // If the letter clicked has been clicked already 
    if(event.target.classList.contains('good') || event.target.classList.contains('bad')) {
        return;
    }
    
    // If the letter is part of the answer 
    for(let i = 0; i < answer.length; i++) {

        if(answerArray[i].includes(event.target.textContent)) {       
            
            letterGroup.children[i].textContent = event.target.textContent;
            event.target.classList.add('good'); 
            countForWin += 1;
        
            // Win condition 
            if(countForWin === answer.length) {
                isGameOver = true;
                winDialog.setAttribute('open', '');
                container.classList.add('end-game');
            }
        } 
    }

    // If the letter isn't part of the answer 
    if(!letterGroup.children[answerArray.indexOf(event.target.textContent)]) {
        hangman.children[countForLoose].classList.remove('hide');
        countForLoose += 1; 
        event.target.classList.add('bad');
        
        // Loose condition 
        if(countForLoose == 6) {
            isGameOver = true;
            lostDialog.setAttribute('open', '');
            container.classList.add('end-game');
        }
    }  
}

const resetGame = () => {

    // Delete all the letters and underscore of the answer 
    const answerLetter = document.querySelectorAll('.answer-letter');
    const lineLetter = document.querySelectorAll('.line');

    for(eachLetter of answerLetter) {
        eachLetter.remove()
    }

    for(eachLine of lineLetter) {
        eachLine.remove()
    }

    // Pick a new random asnwer for the array word 
    index  = Math.floor(Math.random() * 10);
    answer = words[index].toUpperCase();

    for(let i = 0; i <= 5; i++) {
        hangman.children[i].classList.add('hide');
    }
    for(let letter of alphabet) {
        letter.classList.remove('good');
        letter.classList.remove('bad');
    }

    isGameOver = false;
    countForLoose = 0;
    countForWin = 1;
    winDialog.removeAttribute('open');
    lostDialog.removeAttribute('open');
    container.classList.remove('end-game');

    initGame();
}

// Events : 
for(let letter of alphabet) {
    letter.addEventListener('click', isLetterInAnswer);
}

for(let button of resetButton) {
    button.addEventListener('click', resetGame);
}

// Initialization :
initGame();




