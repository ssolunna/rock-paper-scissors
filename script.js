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
                  
type(guideText[0]);

function type(text) {
  let i = 0;
  typeWriter();
  function typeWriter() {
    if (i < text.length) {
      narrative.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
}

