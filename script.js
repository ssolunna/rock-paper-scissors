// JavaScript
// GAME: ROCK, PAPER, SCISSORS

const narrative = document.querySelector('.narrative');
const guideText = [
      'Hello there! My name is Ropasci and I will be your guide.',
      'Here are some things you would like to know:',
      '- Click the left buttons to choose either rock, paper or scissors',
      '- Click the fast forward button to make me speak faster',
      '- Click the next button to continue when I finish speaking',
      '- Click the exit button to end the game'
];
let introduction = guideText.slice(0,6);
const fastForward = document.querySelector('.fastforward-button');
const next = document.querySelector('.next-button');
const choices = document.querySelector('.player-choices');
const exit = document.querySelector('.exit-button');
let fastForward_clicked = false;
let j = 0;
                  
typeIntroduction();

fastForward.addEventListener('click', () => {
  fastForward_clicked = true;
});

function typeIntroduction() {
  if (j == 0) {
    setTimeout(() => {
      type(introduction[0], typeIntroduction)
      j++
    }, 0);
  }
  if (j > 0 && j < introduction.length) {
    setTimeout(() => {
      type(introduction[j], typeIntroduction)
      flashButton();
      j++
    }, 3 * 1000);
  }
  if (j == introduction.length) {
    setTimeout(() => {
      stopFlash(exit);
    }, 3 * 1000);
  }
}

function flashButton() {
  switch (introduction[j]) {
    case introduction[2]:
      flash(choices);
      break;
    
    case introduction[3]:
      stopFlash(choices);
      flash(fastForward);
      break;
    
    case introduction[4]:
      stopFlash(fastForward);
      flash(next);
      break;  
    
    case introduction[5]:
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

function type(text, cb, buttons = 'disabled') {
  let i = 0;
  narrative.textContent = '';
  fastForward_clicked = false;
  switch (buttons) {
    case 'disabled':
      (function typeWriter() {
        if (i < text.length) {
          narrative.textContent += text.charAt(i);
          setTimeout(typeWriter, 100);
        }
        if (i == text.length) {
          cb();
        }
        i++;
      })();
      break;
    
    case 'enabled':
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
          next.addEventListener('click', typeNextText);
        }
        i++;
      })();
      break;
  }
}

let typeNextText = () => { 
  next.removeEventListener('click', typeNextText); 
  type(guideText[1]); 
};


