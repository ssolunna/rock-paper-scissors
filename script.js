// JavaScript
// GAME: ROCK, PAPER, SCISSORS

// Randomly returns either ‘Rock’, ‘Paper’ or ‘Scissors’
function computerPlay() {
  const words = ['Rock', 'Paper', 'Scissors'];
  let randomWord = words[Math.floor(Math.random() * 3)];
  return randomWord
}

// Gets input from the user
function playerPlay() {
  let tries = 0;

  while (true) {
    tries += 1;
    playerSelection = prompt("Rock, Paper or Scissors?");

    if (pattern.test(playerSelection)) {
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
  } else if (playerSelection.toUpperCase() == "PAPER" && computerSelection == "Rock") {
    playerWon = true;
    return `[Round: ${round}/5] You won! Paper beats Rock.`;
  } else if (playerSelection.toUpperCase() == "ROCK" && computerSelection == "Scissors") {
    playerWon = true;
    return `[Round: ${round}/5] You won! Rock beats Scissors.`;
  } else if (playerSelection.toUpperCase() == "SCISSORS" && computerSelection == "Paper") {
    playerWon = true;
    return `[Round: ${round}/5] You won! Scissors beats Paper.`;
  } else {
    computerWon = true;
    return `[Round: ${round}/5] You lose! ${computerSelection} beats ${playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase()}.`;
  }
}

// Plays the game
function game() {
  let player = 0;
  let computer = 0;
  
  for (let i = 0; i < 5; i++) {
    const playerSelection = playerPlay();

    // Cancels the game if the user inputs anything other than ‘Rock’, ‘Paper’ or ‘Scissors’
    if (!pattern.test(playerSelection)) break;

    const computerSelection = computerPlay();
    round += 1;
    playRound(playerSelection, computerSelection);
    console.log(playRound(playerSelection, computerSelection));
    
    // Keeps the score
    if (playerWon) {
      player += 1;
      playerWon = false;
    } else if (computerWon) {
      computer += 1;
      computerWon = false;
    } 

    // Shows the final result after 5 rounds
    if (i === 4) {
      if (player > computer) {
        return "Congratulations! You are the winner."
      } else if (player < computer) {
        return "Game over. You are the loser."
      } else {
        return "The game endend in a tie."
      }
    }
  }
}

let pattern = /^(Rock|Paper|Scissors)$/i;
let round = 0;
let playerWon = false;
let computerWon = false;

//Plays the game
console.log(game());