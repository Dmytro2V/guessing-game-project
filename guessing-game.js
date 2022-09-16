const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let secretNumber // set global
let numAttempts;


askLimit()

function askLimit() {
  rl.question('Enter a number of attempts: ', function (answer) {
    numAttempts = Number(answer);
    askRange()
  })
}

function askRange() { // main
  rl.question('Enter a max number: ', function (answer) {
    let max = Number(answer);
    rl.question('Enter a min number: ', function (answer) {
      let min = Number(answer);
      console.log(`I'm thinking of a number between ${min} and ${max}...`); 
      secretNumber = randomInRange(min, max);
      askGuess()          
    })    
  })  
}

function askGuess() {
  rl.question('Enter a guess: ', function (answer) {
    let num = Number(answer);
    let guessed = checkGuess(num)
    if (guessed) {
      console.log('You win!');
      rl.close();
    } else if (numAttempts === 1) {
      console.log('You lose!');
      rl.close();      
    } else {
      askGuess() 
      numAttempts--        
    }
  })  
}

function checkGuess(num) {
  if (num > secretNumber) {
    console.log('Too high');
    return false
  }  else if (num < secretNumber) {
    console.log('Too low');
    return false
  } else if (num === secretNumber) {
    console.log('Correct!');
    return true;
  } else console.log('Some error');
}

function randomInRange (min, max) { // both inclusive, integer, min < max
  min = Math.ceil(min);
  max = Math.floor(max)
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}