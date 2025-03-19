const ANS_LENGTH = 5;
const letters = document.querySelectorAll(".scoreboard-letter");

async function init() {
  let currentGuess = "";
  let rowGuess = 0;
  function addLetter(letter) {
    if (currentGuess.length < ANS_LENGTH) {
      currentGuess += letter;
    } else {
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    console.log(`position: ${ANS_LENGTH * rowGuess + currentGuess.length - 1}`);
    letters[ANS_LENGTH * rowGuess + currentGuess.length - 1].innerText = letter;
  }

  function commit() {
    if (currentGuess.length !== ANS_LENGTH) {
      // do nothing
      console.log("Hi");
      return;
    }
    if (rowGuess < ANS_LENGTH) {
      currentGuess = "";
      rowGuess++;
    }

    // validate word
  }

  document.addEventListener("keydown", function (event) {
    const action = event.key;
    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

init();
// action, commit, backspace, addLetter,
