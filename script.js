// DOM's element : 
const alphabet = document.querySelectorAll('.letter');
const hangman = document.querySelector('.hangman');
const resetButton = document.querySelectorAll('.reset');
const letterGroup = document.querySelector('.letter-group');
const lineGroup = document.querySelector('.line-group');
const letterAnswer = document.querySelectorAll('.answer-letter');
const line = document.querySelectorAll('.line');
const winDialog = document.querySelector('.win');
const lostDialog = document.querySelector('.lost');
const winPlayerOne = document.querySelector('.win-player-one');
const winPlayerTwo = document.querySelector('.win-player-two');
const container = document.querySelector('.container');
const onePlayer = document.querySelector('.one-player');
const twoPlayer = document.querySelector('.two-player');
const selectPlayerNumber = document.querySelector('.set-player-number'); 
const setGuessWord = document.querySelector('.set-guess-word');
const wordButton = document.querySelector('.word-button');
const playerWord = document.querySelector('.player-word');
const warning = document.querySelector('small');
const returnButton = document.querySelector('.return');

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
const allowedChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 
'W', 'X', 'Y', 'Z'];
let index = Math.floor(Math.random() * 10);
let answer = words[index].toUpperCase(); 
let countForWin = 1;
let countForLoose = 0;
const answerArray = [];
let isGameOver = false;
let numberPlayer; 
let answerTwoPlayer = '';

// Functions : 
const setNumberPlayer = (event) => {
    if(event.target.classList.contains('one-player')) {
        numberPlayer = 1;
        selectPlayerNumber.removeAttribute('open');
        container.classList.remove('hide');
        initGame();
    } else {
        numberPlayer = 2;
        selectPlayerNumber.removeAttribute('open');
        setGuessWord.setAttribute('open', '');
    }
}

const setAnswer = () => {
    
    if(playerWord.value.length > 3) {

        let playerAnswerArray = [];
        const UpperCaseWord = playerWord.value.toUpperCase();

        for(let i = 0; i < playerWord.value.length; i++) {
            playerAnswerArray[i] = UpperCaseWord.substring(i, i+1);
        }

        const isWordAllowed = (array, target) => {
            let index = 0;
            for(let i = 0; i <= array.length; i++) {
                if(target.includes(array[i])) {
                    index++;           
                }
            }
            if(index == array.length) {
                return true;
            } else {
                return false;
            }
        }

        // Verify if entered word is allowed
        if(isWordAllowed(playerAnswerArray, allowedChar) == true) {
            answerTwoPlayer = playerWord.value;
            setGuessWord.removeAttribute('open');
            container.classList.remove('hide');
            initGame();
        } else {
            warning.classList.add('wrong-word');            
        }

    } else {
        warning.classList.add('wrong-word');            
    }
}

const initGame = () => {

    if(numberPlayer == 2) {
        answer = answerTwoPlayer.toUpperCase();
    }
    
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
                container.classList.add('end-game');
                
                if(numberPlayer == 2) {
                    winPlayerTwo.setAttribute('open', '');
                } else {
                    winDialog.setAttribute('open', '');
                }
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
            container.classList.add('end-game');

            if(numberPlayer == 2) {
                winPlayerOne.setAttribute('open', '');
            } else {
              lostDialog.setAttribute('open', '');
            }
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

    // Reset hangman 
    for(let i = 0; i <= 5; i++) {
        hangman.children[i].classList.add('hide');
    }

    // Reset letters from board
    for(let letter of alphabet) {
        letter.classList.remove('good');
        letter.classList.remove('bad');
    }

    isGameOver = false;
    countForLoose = 0;
    countForWin = 1;
    winDialog.removeAttribute('open');
    lostDialog.removeAttribute('open');
    winPlayerOne.removeAttribute('open');
    winPlayerTwo.removeAttribute('open');
    container.classList.remove('end-game');

    // Pick a new random asnwer if one player
    if(numberPlayer == 1) {
        index  = Math.floor(Math.random() * 10);
        answer = words[index].toUpperCase();
        initGame();
    // Or make the second player choose it if 2 players
    } else {
        container.classList.add('hide');
        setGuessWord.setAttribute('open', '');
        warning.classList.remove('wrong-word');
    }    
}

const returnScreen = () => {
    setGuessWord.removeAttribute('open');
    selectPlayerNumber.setAttribute('open', '');
}

// Events : 
for(let letter of alphabet) {
    letter.addEventListener('click', isLetterInAnswer);
}

for(let button of resetButton) {
    button.addEventListener('click', resetGame);
}

onePlayer.addEventListener('click', setNumberPlayer);
twoPlayer.addEventListener('click', setNumberPlayer);

wordButton.addEventListener('click', setAnswer);

returnButton.addEventListener('click', returnScreen);



