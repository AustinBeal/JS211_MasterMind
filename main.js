'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = () =>  {
  // your code here
}

const mastermind = (guess) => {
  guess = 'acda'
  solution = 'abcd';
  var solutionArray = solution.split('')
  var guessArray = guess.split('') 
  var correctLetterLocations = 0
  var correctLetters = 0
    if(solution == guess){
      console.log('you got it!')
      return 'You guessed it!'
    } else {
    for(let i = 0; i <= guessArray.length - 1; i++){
       if(solutionArray[i] === guessArray[i]) {
       correctLetterLocations = correctLetterLocations + 1
       let correctPosition = solutionArray[i] === guessArray[i]
       console.log("Letter is at:", i, "It is:", guessArray[i], "CorrectPosition is:",correctPosition)
       solutionArray[i] = null
        }
        } 
      for(let i = 0; i <= solutionArray.length; i++){
        let targetIndex = solutionArray.indexOf(guessArray[i])
        if(targetIndex > -1){
        correctLetters = correctLetters + 1
        solutionArray[targetIndex] = null}
      }
      console.log("You have",correctLetterLocations, " letter and positions correct! And ", 
        correctLetters, 'other letters correct but not positionally correct')
    }  
  }


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}