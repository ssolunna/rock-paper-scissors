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
let fastForward_clicked = false;
                  
fastForward.addEventListener('click', () => {
  fastForward_clicked = true;
});

let j = 0;
typeIntroduction();

function typeIntroduction() {
  if (j < introduction.length) {
    setTimeout(() => {
      type(introduction[j], typeIntroduction)
      j++
    }, j * 2000);
  }
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


