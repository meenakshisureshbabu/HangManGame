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
  constructor(name, points) {
    this.name = name;
    this.points = points;
  }
  setPoints(point) {
    this.points = point;
  }
  getPoints() {
    return this.points;
  }
}

const words = [
  "GAMES",
  "LABEL",
  "EAGER",
  "GHOST",
  "LABOR",
  "BREAD",
  "AGAIN",
  "AFTER",
  "AWARE",
  "BAKER",
  "BLAME",
  "AVOID",
  "COACH",
];
const hints = [
  "A complete episode or period of play, ending in a definite result",
  "A classifying phrase or name applied to a person or thing",
  "Wanting to do or have something very much",
  "An apparition of a dead person which is believed to appear or become manifest to the living",
  "Work, especially hard physical work",
  "Food made of flour, water, and yeast or another leavening agent, mixed together and baked.",
  "Once more; another time",
  "Behind in place or position; following behind",
  "Having knowledge; conscious; cognizant",
  "A person who makes and sells bread, cake, etc.",
  "To hold responsible; find fault with; censure",
  "to keep away from; keep clear of",
  "a large, horse-drawn, four-wheeled carriage, usually enclosed",
];
const hangmanarray = [
  "rightleg",
  "leftleg",
  "rightarm",
  "leftarm",
  "body",
  "head",
];

let challenge_word;
let incorrect_times = 0;
let human_correct_times = 0;
let computer_correct_times = 0;
let hint;
let random_alphabet;
let keybuttons = document.querySelectorAll(".keybutton");
let list = document.getElementById("character-list");
let li = document.querySelectorAll(".letter");
const human_player = new Player("YOU", 0);
const comp_player = new Player("COMPUTER", 0);
let pressedarray = [];
let word_found = false;
let right_word = 0;
let mySound;
let round = 1;

function start() {
  setTimeout(on, 1000, "USER");
  document.querySelector(".reset").removeAttribute("disabled");
  wrongSound = new sound("wrong-buzzer.mp3");
  rightsound = new sound("correct.mp3");
  successsound = new sound("Success.mp3");
  failsound = new sound("failtone.mp3");
  for (let i = 0; i < hangmanarray.length; i++) {
    document.getElementById(hangmanarray[i]).style.display = "block";
  }
  document.querySelector(".reset").style.display = "block";
  //document.getElementById("incorrect_guess_no").innerHTML = "0/6";
  //document.getElementById("round_no").innerHTML = "1/5";
  enableButtons();
  for (let cnt = 0; cnt < li.length; cnt++) li[cnt].textContent = "";
  let index = Math.floor(Math.random() * 11);
  //console.log(index);
  challenge_word = words[index];
  hint = hints[index];
  //console.log(hint);
  //console.log(challenge_word);
  document.getElementById("hint-display-div").innerHTML = hint;
}

function enableButtons() {
  keybuttons.forEach((e) => {
    e.removeAttribute("disabled");
  });
}

function onload() {
  disablebuttons();
}

function getrandomAlphabet() {
  let randomNum = Math.floor(Math.random() * 26) + 97;
  // Convert the number to a character using the ASCII code
  let randomChar = String.fromCharCode(randomNum);
  // Return the random letter
  return randomChar.toUpperCase();
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
}

function callComputerTurn() {
  let chararray = getCharacterArray();
  //console.log(chararray);
  let id = getrandomAlphabet();
  //alert("COMPUTER TURN");
  //alert("Computer chose the alphabet : " + id);
  //console.log(id);
  checkAlphabet(id, chararray, comp_player);
  setTimeout(on, 1000, "USER");
}

function reset() {
  if (confirm("Are you sure you want to end the game?")) {
    alert("Please click Start button to play again!!");
    incorrect_times = 0;
    document.getElementById("incorrect_guess_no").innerHTML = "";
    document.getElementById("hint-display-div").innerHTML = "";
    for (let cnt = 0; cnt < li.length; cnt++) li[cnt].textContent = "";
    failsound.play();
    window.location.reload();
    //remove the entire stick figure divs
  } else {
    return;
  }
  //start();
}

function disablebuttons() {
  keybuttons.forEach((button) => {
    button.setAttribute("disabled", true);
  });
}

function checkAlphabet(id, chararray, player) {
  let i = 0;
  pressedarray.push(id);
  if (chararray.includes(id)) {
    rightsound.play();
    console.log("HHHHHHHHHH" + right_word);
    if (player.name === "YOU") {
      //human_correct_times++;
      //player.setPoints(human_correct_times);
    } else {
      if (document.getElementById(id).getAttribute("disabled") == "true") {
        //console.log("INSIDE PRESSED");
        return;
      }
      // } else {
      //   computer_correct_times++;
      //   player.setPoints(computer_correct_times);
      // }
    }
    console.log("POINTS FOR " + player.name + ":" + player.points);
    //alert("Gotcha! This alphabet is in the word");
    while (i < li.length) {
      for (let j = 0; j < chararray.length; j++) {
        //alert(li[i].textContent);
        if (id === chararray[i] && li[i].textContent === "") {
          right_word++;
          //alert("Inside true");
          li[i].textContent = id;
          document.getElementById(id).setAttribute("disabled", true);
          i++;
        } else if (li[i].textContent === "") {
          li[i].textContent = "";
          i++;
        } else {
          i++;
        }
      }
    }
    //console.log("-----------------------------RIGHT WORD---------------------------" + right_word);
    if (right_word === 5) {
      successsound.play();
      //check for the complete word
      alert(
        "*******************" +
          player.name +
          "WON THIS ROUND*******************"
      );
      if (player.name === "YOU") {
        human_correct_times++;
        player.setPoints(human_correct_times);
      } else {
        computer_correct_times++;
        player.setPoints(computer_correct_times);
      }

      console.log("PLAYER POINTS:" + player.getPoints());
      for (let cnt = 0; cnt < li.length; cnt++) {
        li[cnt].textContent = chararray[cnt];
      }
      disablebuttons();
      word_found = true;
      setTimeout(askNextword, 1000);
    }
  } else {
    wrongSound.play();
    incorrect_times++;
    //console.log(incorrect_times);

    //alert("This alphabet is not in the word");
    let hangmanelement = document.querySelector(
      "." + hangmanarray[incorrect_times - 1]
    );
    if (incorrect_times < 6) {
      hangmanelement.style.display = "none";
      document.getElementById("incorrect_guess_no").innerHTML =
        incorrect_times + "/6";
      document.getElementById(id).setAttribute("disabled", true);
    } else {
      //alert("WORD NOT FOUND");
      failsound.play();
      document.getElementById("incorrect_guess_no").innerHTML =
        incorrect_times + "/6";
      hangmanelement.style.display = "none";
      //console.log("CHANLLENGE WORD:" + chararray);
      for (let cnt = 0; cnt < li.length; cnt++) {
        li[cnt].textContent = chararray[cnt];
      }
      disablebuttons();
      if (round < 5) {
        console.log("ROUND: "+round);
        setTimeout(askNextword, 1000);
      } else {
        alert("GAME OVER");
        cancelgame();
        setTimeout(start, 1000);
      }
    }
  }
}

function askNextword() {
  if (confirm("Do you want to proceed to next word?")) {
    document.getElementById("yourscore").innerHTML = human_player.getPoints();
    document.getElementById("compscore").innerHTML = comp_player.getPoints();
    word_found = false;
    round++;
    right_word = 0;
    incorrect_times = 0;
    document.getElementById("incorrect_guess_no").innerHTML = "0/6";
    document.getElementById("round_no").innerHTML = round + "/5";
    start();
  } else {
    cancelgame();
    setTimeout(reset, 1000);
  }
}


function cancelgame(){
  if (human_player.getPoints() > comp_player.getPoints()) {
    successsound.play();
    alert("*******************YOU WON THE GAME****************");

    //alert("Press start to play again!");
  } else if (human_player.getPoints() == comp_player.getPoints()) {
    alert("****************** IT'S A TIE *************");
  } else {
    wrongSound.play();
    alert("****************YOU LOST THE GAME****************");
  }
}

function getCharacterArray() {
  return Array.from(challenge_word);
}

function on(user) {
  if (user === "COMPUTER") {
    document.getElementById("computeroverlay").style.display = "block";
    setTimeout(off, 1000, "COMPUTER");
  } else {
    document.getElementById("useroverlay").style.display = "block";
    setTimeout(off, 1000, "USER");
  }
}

function off(user) {
  if (user === "COMPUTER") {
    document.getElementById("computeroverlay").style.display = "none";
  } else {
    document.getElementById("useroverlay").style.display = "none";
  }
}

function printAlphabet(id) {
  //alert(id.id);
  //alert(challenge_word);
  //alert("You pressed :" + id.id);
  let char_array = getCharacterArray();
  checkAlphabet(id.id, char_array, human_player);
  if (incorrect_times < 6 && !word_found && right_word != 5) {
    //setTimeout(on, 1000, "COMPUTER");
    setTimeout(callComputerTurn, 2000);
  } else {
    return;
  }
}
