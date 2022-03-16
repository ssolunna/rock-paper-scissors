// JavaScript
// GAME: ROCK, PAPER, SCISSORS

function computerPlay() {
  const words = ['Rock', 'Paper', 'Scissors'];
  let randomWord = words[Math.floor(Math.random() * 3)];
  return randomWord
}

function playRound(playerSelection, computerSelection) {
  let pattern = /^(Rock|Paper|Scissors)$/i;
  if (pattern.test(playerSelection)) {
    if (playerSelection.toUpperCase() === computerSelection.toUpperCase()) {
      tie = true;
      return "It's a tie.";
    } else if (playerSelection.toUpperCase() == "PAPER" && computerSelection == "Rock") {
      userWon = true;
      return "You won! Paper beats Rock.";
    } else if (playerSelection.toUpperCase() == "ROCK" && computerSelection == "Scissors") {
      userWon = true;
      return "You won! Rock beats Scissors.";
    } else if (playerSelection.toUpperCase() == "SCISSORS" && computerSelection == "Paper") {
      userWon = true;
      return "You won! Scissors beats Paper.";
    } else {
      computerWon = true;
      return `You lose! ${computerSelection} beats ${playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase()}.`;
    }
  } else {
    return "That is NOT rock, paper or scissors."
  }
}

function game() {
  let user = 0;
  let computer = 0;
  for (let i = 0; i < 5; i++) {
    const playerSelection = prompt("Rock, Paper or Scissors?");
    const computerSelection = computerPlay();
    console.log(playRound(playerSelection, computerSelection));
    playRound(playerSelection, computerSelection)
    if (userWon) {
      user += 1;
      userWon = false;
    } else if (computerWon) {
      computer += 1;
      computerWon = false;
    } else {
      tie = false;
    }
  }
  if (user > computer) {
    return "Congratulations! You are the winner."
  } else if (user < computer) {
    return "Game over. You are the loser."
  } else {
    return "The game finished with a tie."
  }
}

let tie = false;
let userWon = false;
let computerWon = false;
console.log(game());