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
      'Choose rock, paper or scissors by clicking the corresponding button'
];
let halfIntroduction = guideText.slice(0,6);
const fastForward = document.querySelector('.fastforward-button');
const next = document.querySelector('.next-button');
const choices = document.querySelector('.player-choices');
const exit = document.querySelector('.exit-button');
let fastForward_clicked = false;
let el = 0; // Keep track of guideText's elements
                  
typeIntroduction();

fastForward.addEventListener('click', () => {
  fastForward_clicked = true;
});

function typeIntroduction(cb) {
  if (el == 0) {
    setTimeout(() => {
      type(guideText[el], typeIntroduction)
      el++
    }, 0);
  }
  if (el > 0 && el < halfIntroduction.length) {
    setTimeout(() => {
      type(guideText[el], typeIntroduction)
      flashButton();
      el++
    }, 3 * 1000);
  }
  if (el == halfIntroduction.length) {
    setTimeout(() => {
      stopFlash(exit);
      cb(guideText[el], 'none', 'enable');
    }, 3 * 1000);
  }
}

function flashButton() {
  switch (guideText[el]) {
    case guideText[2]:
      flash(choices);
      break;
    
    case guideText[3]:
      stopFlash(choices);
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

function type(text, cb, narrativeButtons = 'disable') {
  let i = 0;
  narrative.textContent = '';
  fastForward_clicked = false;
  switch (narrativeButtons) {
    case 'disable':
      (function typeWriter() {
        if (i < text.length) {
          narrative.textContent += text.charAt(i);
          setTimeout(typeWriter, 100);
        }
        if (i == text.length) {
          cb(type);
        }
        i++;
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
          }
        }
        i++;
      })();
      break;
  }
}

let typeNextText = () => { 
  next.removeEventListener('click', typeNextText);
  el++
  type(guideText[el], 'none', 'enable'); 
};


