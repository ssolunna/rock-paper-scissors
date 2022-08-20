// JavaScript
// GAME: ROCK, PAPER, SCISSORS

const narrative = document.querySelector('.narrative');
const guideText = [
      'Hello there! My name is Ropasci and I will be your guide.',
      'Here are some things you would like to know:',
      '- Click the player buttons to choose either rock, paper or scissors (aligned from top to bottom)',
      '- Click the fast forward button to make me speak faster',
      '- Click the next button to continue when I finish speaking',
      '- Click the exit button to end the game',
      // End of the introductory text half
      'The rules are simple:',
      "- The first to take all their opponent's lives is the winner",
      "- And in case you didn't already know: rock beats scissors, scissors beats paper and paper beats rock",
      "That's all. Let's play!",
      // End of introductory text
      'Choose rock, paper or scissors.'
];
const halfIntro = guideText.slice(0,6);
const fastForward = document.querySelector('.fastforward-button');
const next = document.querySelector('.next-button');
const playerChoices = document.querySelector('.player-choices');
const exit = document.querySelector('.exit-button');
const body = document.querySelector('body');
const header = document.querySelector('header');
const skipIntro = document.createElement('button');
let fastForward_clicked = false;
let skipIntro_clicked = false;
let timeoutId;
let intervalId;
let el = 0; // Keep track of guideText's elements
const choices = document.querySelectorAll('.rps');
const computerBox = document.querySelector('.computer-box');
let playerSelection;
let playerChoice;
let computerSelection;
let computerChoice;
let round = 1;
let playerScore = 0;
let computerScore = 0;
const playerLifes = document.querySelectorAll('.player-lifes>.heart');
const computerLifes = document.querySelectorAll('.computer-lifes>.heart');
const playerAvatar = document.querySelector('.player-avatar');
const computerAvatar = document.querySelector('.computer-avatar');
let playerWon = false;
let computerWon = false;

playRound();

function playRound() {
  (playerScore == 5) ? console.log('Game over.') :
  (computerScore == 5) ? console.log('Game over.') :
  selectChoice();
}

function selectChoice() {
  choices.forEach((choice) => {
    choice.onclick = (e) => {
      playerSelection = e.target.cloneNode();
      playerPlay(e.target);
    };
  });
}

function playerPlay(button) {
  choices.forEach((choice) => choice.onclick = null);
  playerSelection.classList.add('selected');
  computerBox.before(playerSelection);
  button.classList.add('hidden');
  playerChoice = playerSelection.classList[0];
  computerPlay();
}

function computerPlay() {
  const words = ['rock', 'paper', 'scissors'];
  computerChoice = words[Math.floor(Math.random() * 3)];
  let choice = document.querySelector(`.computer-choices>.${computerChoice}`);
  computerSelection = choice.cloneNode();
  computerSelection.classList.add('selected');
  computerSelection.style.cssText = "transform: rotate(270deg);";
  computerBox.before(computerSelection);
  choice.classList.add('hidden');
  checkWinner(playerChoice, computerChoice);
}

function checkWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    console.log(`[Round: ${round}] It's a tie.`);

  } else if ((playerChoice === "paper" && computerChoice === "rock") || (playerChoice === "rock" && computerChoice === "scissors") || (playerChoice === "scissors" && computerChoice === "paper")) {
    playerScore++;
    playerWon = true;
    flash(computerLifes[playerScore - 1]);

  } else {
    computerScore++;
    computerWon = true;
    flash(playerLifes[5 - computerScore]);
  }
  round++;
  setTimeout(() => {
    if (computerWon) {
      stopFlash(playerLifes[5 - computerScore]);
      playerLifes[5 - computerScore].classList.add('dimmed');
      if (computerScore == 5) { playerAvatar.classList.add('dimmed'); };

    } else if (playerWon) {
      stopFlash(computerLifes[playerScore - 1]);
      computerLifes[playerScore - 1].classList.add('dimmed');
      if (playerScore == 5) { computerAvatar.classList.add('dimmed'); };
    }

    clearSelection();
    playRound();
  }, 3 * 1000);
}

function clearSelection() {
  playerWon = false;
  computerWon = false;
  playerSelection.remove();
  computerSelection.remove();
  let selections = document.querySelectorAll('.hidden');
  selections.forEach(selection => {
    selection.classList.remove('hidden');
  });
}

// typeIntroduction();

function displaySkipIntro() {
  skipIntro.textContent = 'Skip introduction';
  skipIntro.setAttribute('class', 'skip-intro');
  body.insertBefore(skipIntro, header);
  skipIntro.addEventListener('click', () => {
    skipIntro_clicked = true;
    if (timeoutId && narrative.textContent == guideText[el - 1]) {
      type(guideText[10], 'none');
      hideSkipIntro();
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  });
}

function hideSkipIntro() {
  if (skipIntro_clicked) { skipIntro_clicked = false; }
  skipIntro.classList.add('hidden');
}

function typeIntroduction(cb) {
  if (el == 0) {
    setTimeout(() => {
      type(guideText[el], typeIntroduction)
      el++
      setTimeout(displaySkipIntro, 1 * 1000);
    }, 0);
  }
  if (el > 0 && el < halfIntro.length) {
    timeoutId = setTimeout(() => {
      type(guideText[el], typeIntroduction)
      flashButton();
      el++
    }, 3 * 1000);
  }
  if (el == halfIntro.length) {
    setTimeout(() => {
      stopFlash(exit);
      cb(guideText[el], 'none', 'enable');
      hideSkipIntro();
    }, 3 * 1000);
  }
}

function flashButton() {
  switch (guideText[el]) {
    case guideText[2]:
      flash(playerChoices);
      break;
    
    case guideText[3]:
      stopFlash(playerChoices);
      flash(fastForward);
      break;
    
    case guideText[4]:
      stopFlash(fastForward);
      flash(next);
      break;  
    
    case guideText[5]:
      stopFlash(next);
      flash(exit);
      break;
    
    default:
      break;
  }
}

function flash(button) {
  intervalId = setInterval(() => {
    button.classList.toggle('hidden');
  }, 500);
}

function stopFlash(button) {
  clearInterval(intervalId);
  button.classList.remove('hidden');
}

fastForward.addEventListener('click', () => fastForward_clicked = true);

function type(text, cb, narrativeButtons = 'disable') {
  let i = 0;
  narrative.textContent = '';
  fastForward_clicked = false;
  switch (narrativeButtons) {
    case 'disable':
      (function typeWriter() {
        if (skipIntro_clicked) {
          hideSkipIntro();
          type(guideText[10], 'none');
        } else {
          if (i < text.length) {
            narrative.textContent += text.charAt(i);
            setTimeout(typeWriter, 100);
          }
          if (i == text.length) {
            if (cb !== 'none') { cb(type); }
          }
          i++;
        }
      })();
      break;
    
    case 'enable':
      (function typeWriter() {
        if (i < text.length) {
          narrative.textContent += text.charAt(i);
          if (fastForward_clicked == true) {
            setTimeout(typeWriter, 0);
          } else {
            setTimeout(typeWriter, 100);
          }
        }
        if (i == text.length) {
          if (guideText.indexOf(text) <= 9) {  // 9 = End of introductory text
            next.addEventListener('click', typeNextText);
            timeoutId = setTimeout(() => {
              flash(next);
              next.onmouseenter = () => stopFlash(next);
              next.onmouseleave = () => flash(next);
            }, 5 * 1000);
          }
        }
        i++;
      })();
      break;
  }
}

let typeNextText = () => { 
  next.removeEventListener('click', typeNextText);
  stopFlash(next);
  next.onmouseenter = null;
  next.onmouseleave = null;
  clearTimeout(timeoutId);
  el++
  type(guideText[el], 'none', 'enable'); 
};


