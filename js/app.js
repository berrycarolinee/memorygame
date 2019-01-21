// set ivariables

const deck = document.querySelector('.deck');
let toggledCards = []; // array for toggled cards
let moves = 0; // start with zero moves
let clockOff = true; // start with timer off
let time = 0; // start with time at 0
let clockId;
let matchedCards = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
// shuffle deck of cards and append
function shuffleDeck() {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards) {
      deck.appendChild(card);
  }
}
shuffleDeck();

// When card in deck is clicked, clock begins
deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)) {
    if (clockOff) {
      startClock();
      clockOff = false;
    }

    if (clickTarget.classList.contains('card') &&
		  toggledCards.length < 2 &&
		  !toggledCards.includes(clickTarget)
		  ){
      toggleCard(clickTarget);
      addToggleCard(clickTarget);
      // when 2 cards are toggled, check for a match, add move and check score
        if (toggledCards.length === 2) {
          checkForMatch(clickTarget);
          addMove();
          checkScore();
        }
    }
  }
});

// function to open & show each card when clicked
function toggleCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}


// add toggled card to toggledCards array
function addToggleCard(clickTarget) {
  toggledCards.push(clickTarget);
  console.log(toggledCards);
}

function checkForMatch() {
  // if both of the first 2 toggled cards within the array match classes, then add to the matched cards and reset the array to zero
  if (
    toggledCards[0].firstElementChild.className ===
    toggledCards[1].firstElementChild.className
  ) {
      toggledCards[0].classList.toggle('match');
      toggledCards[1].classList.toggle('match');
      toggledCards = [];
      matchedCards++;
      // If all pairs are matched, game is finished
      const TOTAL_PAIRS = 8;
      if (matchedCards === TOTAL_PAIRS) {
          gameOver();
      }
  // otherwise, cards flip back over after 800ms
  } else {
      setTimeout(() => {
        toggleCard(toggledCards[0]);
        toggleCard(toggledCards[1]);
        toggledCards = [];
      }, 800);
  }
}

function isClickValid(clickTarget) {
  return (
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    toggledCards.length < 2 &&
    !toggledCards.includes(clickTarget)
  );
}

// Add moves
function addMove() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}
// Take away stars
function checkScore() {
  if (moves === 14 || moves === 22)
  {   hideStar();
  }
}

function hideStar() {
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    if (star.style.display !== "none") {
      star.style.display = 'none';
      break;
    }
  }
}
function startClock() {
  clockId = setInterval(() => {
    time++;
    displayTime();
    console.log(time);
  }, 1000);
}

function displayTime() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const clock = document.querySelector('.clock');
  clock.innerHTML = minutes + ":" + seconds;
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  }  else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
}

function stopClock() {
  clearInterval(clockId);
}


function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 3
  for (star of stars) {
    if (star.style.display == 'none') {
      starCount--;
    }
  }
    return starCount;
}


document.querySelector('.restart').addEventListener('click', resetGame);

function resetGame() {
  resetScoreboard();
  resetMoves();
  resetStars();
  resetCards();
  shuffleDeck();
  resetMatchedCards();
}

function replayGame() {
  resetGame();
}

function resetScoreboard() {
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
  stars = 0
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}

function gameOver() {
  stopClock();
  createModal();
  toggleModal();
}

function resetCards() {
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
      card.className = 'card';
  }
}

function resetMatched() {
  matchedCards = 0;
}

var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function createModal() {
  const timeModal = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesModal = document.querySelector('.modal_moves');
  const starsModal = document.querySelector('.modal_stars');
  const stars = getStars();
// pull information from html to display in modal
  timeModal.innerHTML = `Time: ${clockTime}`;
  movesModal.innerHTML = `Moves: ${moves + 1}`;
  starsModal.innerHTML = `Stars:  ${stars}`;
}


function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

function closeAndReset() {
  toggleModal();
  resetGame();
}

// modal closes when button is clicked
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// play again button resets everything and modal closes
document.getElementById("modalBtn").addEventListener("click", closeAndReset);

// Shuffle the cards

//Loop through each card and create its html
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
