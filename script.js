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

class Player{
    constructor(name){
        this.name=name;
    }
}


const words = ["GAMES", "LABEL","EAGER","GHOST","LABOR"];
const hints = [
  "a complete episode or period of play, ending in a definite result",
  "a classifying phrase or name applied to a person or thing",
  "wanting to do or have something very much",
  "an apparition of a dead person which is believed to appear or become manifest to the living",
  "Work, especially hard physical work"
];

let challenge_word;
let incorrect_times = 0;
let hint;

function start(){
    let index = Math.floor(Math.random() * 5);
    console.log(index);
    challenge_word = words[index];
    hint = hints[index];
    console.log(hint);
    console.log(challenge_word);
    document.getElementById("hint-display-div").innerHTML = hint;
}


