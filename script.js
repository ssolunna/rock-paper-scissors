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
      return "It's a tie."
    } else if (playerSelection.toUpperCase() == "PAPER" && computerSelection == "Rock") {
      return "You won! Paper beats Rock.";
    } else if (playerSelection.toUpperCase() == "ROCK" && computerSelection == "Scissors") {
      return "You won! Rock beats Scissors.";
    } else if (playerSelection.toUpperCase() == "SCISSORS" && computerSelection == "Paper") {
      return "You won! Scissors beats Paper.";
    } else {
      return `You lose! ${computerSelection} beats ${playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase()}.`;
    }
  } else {
    return "That is NOT rock, paper or scissors."
  }
}

const playerSelection = prompt("Rock, Paper or Scissors?");
const computerSelection = computerPlay();
console.log(playRound(playerSelection, computerSelection));
// console.log(playerSelection);
// console.log(computerSelection);