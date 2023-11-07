/*                                            HANG MAN GAME
------------------------------------------------------------------------------------------------------------------------

1. Two Player game - Player 1 Vs Computer (All words are 5 letter words and they will be randomly chosen)
2. Totally there will be 6 chances to find the word.(Each 3 chances)
3. There will be a hint displayed on the screen.
4. There will be an empty hangstage at the beginning of the game.
5. If there is any wrong guess, the Incorrect guess will be incremented and the hangman head will appear with animation. Also slowly for each wrong
    guess, the stick hands and stick legs will appear. After the 6 incorrect guesses, the hangman will be hanged up and the game is over. 
6. Then the game will be restarted again with the new word.
6. If the letter guessed is right, then that word will be showed up in all the blanks wherever it belongs to.
7. Whoever found the word first, that player is the winner.
8. The player can reset the game if he wants to discontinue.
9. If both the player didn't found the word, the game is tie and the game will be reset once again with the new word.
*/

class Player {
  constructor(name) {
    this.name = name;
  }
}

const words = ["GAMES", "LABEL", "EAGER", "GHOST", "LABOR"];
const hints = [
  "a complete episode or period of play, ending in a definite result",
  "a classifying phrase or name applied to a person or thing",
  "wanting to do or have something very much",
  "an apparition of a dead person which is believed to appear or become manifest to the living",
  "Work, especially hard physical work",
];

let challenge_word;
let incorrect_times = 0;
let hint;
let random_alphabet;
let keybuttons = document.querySelectorAll(".keybutton");

function start() {
  keybuttons.forEach((e) => {
    console.log(e.removeAttribute("disabled"));
  });
  let index = Math.floor(Math.random() * 5);
  console.log(index);
  challenge_word = words[index];
  hint = hints[index];
  console.log(hint);
  console.log(challenge_word);
  document.getElementById("hint-display-div").innerHTML = hint;
}

function onload() {
  keybuttons.forEach((e) => {
    e.setAttribute("disabled", true);
  });
}

function getrandomAlphabet() {
  let randomNum = Math.floor(Math.random() * 26) + 97;
  // Convert the number to a character using the ASCII code
  let randomChar = String.fromCharCode(randomNum);
  // Return the random letter
  return randomChar;
}

function callComputerTurn() {
  let chararray = getCharacterArray();
  console.log(chararray);
}

function getCharacterArray() {
  return Array.from(challenge_word);
}

function printAlphabet(id) {
  alert(id.id);
  alert(challenge_word);
  let char_array = Array.from(challenge_word);
  //console.log(challenge_word);
  let list = document.getElementById("character-list");
  let li = document.querySelectorAll(".letter");

  let i = 0;

  if (char_array.includes(id.id)) {
    while (i < li.length) {
      for (let j = 0; j < char_array.length; j++) {
        alert(li[i].textContent);
        if (id.id === char_array[i] && li[i].textContent === "") {
          alert("Inside true");
          li[i].textContent = id.id;
          document.getElementById(id.id).setAttribute("disabled", true);
          i++;
        } else if (li[i].textContent === "") {
          li[i].textContent = "";
          i++;
        } else {
          i++;
        }
      }
    }
  } else {
    incorrect_times++;
    console.log(incorrect_times);
    if (incorrect_times <= 6) {
      document.getElementById("incorrect_guess_no").innerHTML =
        incorrect_times + "/6";
      document.getElementById(id.id).setAttribute("disabled", true);
    } else {
      alert("You lose, GAME OVER");
      const buttons = document.querySelectorAll(".keybutton");
      buttons.forEach((button) => {
        button.setAttribute("disabled", true);
      });
    }
  }

  callComputerTurn();
}
