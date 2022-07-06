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
const fastForward = document.querySelector('.fastforward-button');
const next = document.querySelector('.next-button');
let fastForward_clicked = false;
                  
fastForward.addEventListener('click', () => {
  fastForward_clicked = true;
});

type(guideText[0]);

function type(text) {
  let i = 0;
  narrative.textContent = '';
  fastForward_clicked = false;
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
}

let typeNextText = () => { 
  next.removeEventListener('click', typeNextText); 
  type(guideText[1]); 
};


