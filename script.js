// JavaScript
// GAME: ROCK, PAPER, SCISSORS

function computerPlay() {
  const words = ['Rock', 'Paper', 'Scissors'];
  let randomWord = words[Math.floor(Math.random() * 3)];
  return randomWord
}

// Gets and validates input from the user
function playerPlay() {
  let tries = 0;

  while (true) {
    tries += 1;
    playerSelection = prompt("Rock, Paper or Scissors?");

    if (choices.test(playerSelection)) {
      return playerSelection;
    } else if (tries == 3) {
      console.log("[Tries: 3/3] Too many wrong tries. Game canceled.");
      break;
    } else if (playerSelection === null) {
      console.log("Game canceled.");
      break;
    }
    
    console.log(`[Tries: ${tries}/3] Please type either rock, paper or scissors.`);
  }
}

// Plays a single round of the game
function playRound(playerSelection, computerSelection) {
  if (playerSelection.toUpperCase() === computerSelection.toUpperCase()) {
    return `[Round: ${round}/5] It's a tie.`;

  } else if (playerSelection.toUpperCase() === "PAPER" && computerSelection === "Rock") {
    playerWon = true;
    return `[Round: ${round}/5] You won! Paper beats Rock.`;
  } else if (playerSelection.toUpperCase() === "ROCK" && computerSelection === "Scissors") {
    playerWon = true;
    return `[Round: ${round}/5] You won! Rock beats Scissors.`;
  } else if (playerSelection.toUpperCase() === "SCISSORS" && computerSelection === "Paper") {
    playerWon = true;
    return `[Round: ${round}/5] You won! Scissors beats Paper.`;
    
  } else {
    computerWon = true;
    return `[Round: ${round}/5] You lose! ${computerSelection} beats ${playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase()}.`;
  }
}

function playGame() {
  let playerScore = 0;
  let computerScore = 0;
  
  for (let i = 0; i < 5; i++) {
    const playerSelection = playerPlay();

    // Cancels the game if the user inputs anything other than ‘Rock’, ‘Paper’ or ‘Scissors’
    if (!choices.test(playerSelection)) break;

    const computerSelection = computerPlay();
    round += 1;
    playRound(playerSelection, computerSelection);
    console.log(playRound(playerSelection, computerSelection));
    
    // Keeps the score
    if (playerWon) {
      playerScore += 1;
      playerWon = false;
    } else if (computerWon) {
      computerScore += 1;
      computerWon = false;
    } 

    // Shows the final result after 5 rounds
    if (i === 4) {
      if (playerScore > computerScore) {
        return "Congratulations! You are the winner."
      } else if (playerScore < computerScore) {
        return "Game over. You are the loser."
      } else {
        return "The game endend in a tie."
      }
    }
  }
}

const choices = /^(Rock|Paper|Scissors)$/i;
let round = 0;
let playerWon = false;
let computerWon = false;

console.log(playGame());