const ANS_LENGTH = 5;
const letters = document.querySelectorAll(".scoreboard-letter");
const WORD_URL = "https://words.dev-apis.com/word-of-the-day";

async function getWord() {
  const res = await fetch(WORD_URL);
  const obj = await res.json();
  return obj;
}

getWord();

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

  function backspace() {
    if (currentGuess.length > 0) {
      letters[ANS_LENGTH * rowGuess + currentGuess.length - 1].innerText = "";
      currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    }
  }

  function commit() {
    async function validateWord() {
      const response = await fetch(request);
      const data = await response.json();
      console.log(data.validWord);
      return data.validWord;
    }

    const request = new Request("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });

    let isValid = validateWord();
    console.log("isValid: ", isValid);

    if (currentGuess.length !== ANS_LENGTH) {
      // do nothing
      console.log("Hi");
      return;
    }
    if (isValid) {
      if (rowGuess < ANS_LENGTH) {
        currentGuess = "";
        rowGuess++;
      }
    } else {
      return;
      //do nothing
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
