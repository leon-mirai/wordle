const ANS_LENGTH = 5;
const letters = document.querySelectorAll(".scoreboard-letter");
const WORD_URL = "https://words.dev-apis.com/word-of-the-day?random=1";
const ROUNDS = 6;

async function init() {
  let currentGuess = "";
  let currentRow = 0;

  const res = await fetch(WORD_URL);
  const wordObj = await res.json();
  const word = await wordObj.word.toUpperCase();
  const wordParts = word.split("");
  let done = false;

  function addLetter(letter) {
    if (currentGuess.length < ANS_LENGTH) {
      currentGuess += letter;
    } else {
      currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    console.log(`position: ${ANS_LENGTH * currentRow + currentGuess.length - 1}`);
    letters[ANS_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
  }

  function backspace() {
    if (currentGuess.length > 0) {
      letters[ANS_LENGTH * currentRow + currentGuess.length - 1].innerText = "";
      currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    }
  }

  async function commit() {
    if (currentGuess.length !== ANS_LENGTH) {
      // do nothing
      return;
    }

    if (currentGuess === word) {
      alert("You win!");
      done = true;
    }

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

    let isValid = await validateWord();
    console.log("isValid: ", isValid);

    if (isValid /*&& currentRow < ANS_LENGTH*/) {
      const guessParts = currentGuess.split("");
      const map = makeMap(wordParts);
      console.log(map);
      // green highlight
      for (let i = 0; i < ANS_LENGTH; i++) {
        if (guessParts[i] === wordParts[i]) {
          letters[currentRow * ANS_LENGTH + i].classList.add("correct");
          map[guessParts[i]]--;
        }
      }

      // yelllow highlight
      for (let i = 0; i < ANS_LENGTH; i++) {
        if (guessParts[i] === wordParts[i]) {
          // do nothing
        } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
          letters[currentRow * ANS_LENGTH + i].classList.add("near");
          map[guessParts[i]]--;
        } else {
          letters[currentRow * ANS_LENGTH + i].classList.add("wrong");
        }
      }

      currentGuess = "";
      currentRow++;

      if (currentRow === ROUNDS) {
        alert(`I"VE SEEN THESE GAMES BEFORE you lose. The word was ${word}`);
        done = true;
      }
    }
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

function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }

  return obj;
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

init();
// action, commit, backspace, addLetter,
