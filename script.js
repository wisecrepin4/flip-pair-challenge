let elements = ["🎯", "🎮", "🎸", "🎨", "🎭", "🎪", "🎲", "🎳"];
elements = [...elements, ...elements]; // duplicate for pairs

// Shuffle
elements.sort(() => Math.random() - 0.5);

let trials = 0;
let board = document.querySelector(".board");
let trialCount = document.querySelector(".trials");
let winMsg = document.querySelector(".win");
let restartBtn = document.querySelector(".restart");

let first = null;
let second = null;
let lockBoard = false;
let matchedPairs = 0;

// Create cards
trialCount.innerHTML = trials;
elements.forEach((el) => {
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = "";
  card.dataset.val = el;
  card.addEventListener("click", clickfun);
  board.appendChild(card);
});

// Click function
function clickfun(e) {
  if (lockBoard) return;

  let clicked = e.target;
  if (clicked === first || clicked.classList.contains("matched")) return;

  clicked.innerHTML = clicked.dataset.val;
  clicked.classList.add("flipped");

  if (!first) {
    first = clicked;
    trials++;
  } else {
    second = clicked;
    lockBoard = true;

    trialCount.textContent = `: ${trials}`;

    if (first.dataset.val === second.dataset.val) {
      first.classList.add("matched");
      second.classList.add("matched");
      resetFlips();
      matchedPairs++;

      if (matchedPairs === elements.length / 2) {
        winMsg.style.display = "block";
      }
    } else {
      setTimeout(() => {
        first.innerHTML = "";
        second.innerHTML = "";
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        resetFlips();
      }, 1000);
    }
  }
}

function resetFlips() {
  [first, second] = [null, null];
  lockBoard = false;
}

// Restart button
restartBtn.addEventListener("click", () => {
  location.reload(); // quick restart
  winMsg.classList.add("hidden");
});
