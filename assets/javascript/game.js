

var game = {

  //------Game Data---------
  "wordBank"           : ["Willie Nelson","Johnny Cash","Waylon Jennings"],
  "guessesRemaining"   : 0,  // at least the length of the word + 5
  "charsGuessed"       : [], // array of the chars user has guessed
  "charsCorrect"       : 0,  // number of the correct chars the user has guessed
  "theWord"            : "", // the active word that needs to be guessed
  "wordsUsed"          : [], // words already used
  "searchBank"         : {}, // efficient search bank of the word's chars
  "userGuess"          : "", // the user's guess

  /*-----Object Methods-------
   *  Pure:
   *    gameHelpers:
     *    gameOver()
     *    allCharsAt()
     *    victory()
     *    checkWord()
     *    allCharsAt()
   *
   *
   *  Impure:
   *    randomWord()
   *
   */

 //---------Object of Helper Functions for Game ------------
 "helpers" : {
    //--- return a random value from an array
    // pass the array of possible words/phrases
    "randomWord" : function(anArray) {
      return anArray[Math.floor(Math.random() * anArray.length)];
    },

    //--- takes a string and returns an object consisting of distinct characters as keys
    //--- with an array of that characters indices in the given string
    //--- will also return the position of spaces
    //--- "trueChars" = the number of characters that aren't spaces.
    //--- pass the word or phrase chosen
    "initSearchBank" : function (aString) {
        var obj = {"trueChars" : 0};
        for(var i = 0; i < aString.length; i++) {
           var iChar = aString[i].toLowerCase();
           if (obj.hasOwnProperty(iChar)){
            obj[iChar].push(i);
            //console.log("added another " + iChar + " to array");
            //console.log("obj."+iChar+" now = "+obj[iChar]);

            } else {
              //console.log("first occurrance of " + iChar);
              obj[iChar]=[];
              //console.log("created empty array");
              obj[iChar].push(i);
              //console.log("added " + iChar + " to array");
              //console.log("obj."+iChar+" now = "+obj[iChar]);
              }
        }
        for (x in obj){
          if ((x != " ") && (x != "trueChars")) {
            obj["trueChars"]+=obj[x].length;
          }
        }
        return obj;
      },

    //---returns true if the choice is in the word/phrase at all
    // pass the word/phrase & the user's char choice
    "checkWord" : function(aString,aChar) {
      return aString.indexOf(aChar.toLowerCase()) === -1 ? false : true;
    },

    //--- word checker receives a search bank and character
    //--- returns false if the char doesn't exist in the bank
    //--- returns an array with the first index holding true and the
    //---   second index holding an array of that character's indices in the word
    //-- pass it the search bank and a character
    "checkWord2" : function(anObj,aChar) {
      return anObj.hasOwnProperty(aChar) ? ([true,anObj[aChar]],
                                             this.charsCorrect.push(aChar)) :
                                             false;
    },

    //--- returns the number of spaces in the word/phrase
    // pass the word/phrase
    "numOfSpaces" : function (aString) {
      return aString.includes(" ") ? aString.match((/ /g) || []).length
                                           : [0,0];
    },

    //--- returns an array of indices for every position of correct char
    // pass the word/phrase and the user's choice when correct.
    "allCharsAt" : function(aString,aChar,i) {
      var charPositions = [];
      for (var i=aString.length(); i>aString.length(); i++) {
        if aString[i] === aChar {
          charPositions[i] === i;
        }
      }
      return charPositions;
    }
    //***************** end of helpers object ***************
  },

  //---------- game methods -----------

  //--- returns the word for use in the round and flags it as used by
  //--- adding it to the wordsUsed array.
  "grabWord" : function(anArray) {
    var theGet = this.helpers.randomWord(anArray);
    return this.wordsUsed.indexOf(theGet) != -1 ? (console.log("already used that word"), this.grabWord(anArray)) :
                                             (this.wordsUsed.push(theGet.toString()), this.theWord=theGet.toString());
  },

  //--- initialize all the game variables and set up the search bank for
  //--- testing user guesses
  "gameInit" : function() {
    this.charsGuessed = [];
    this.charsCorrect = [];
    this.theWord = this.grabWord(this.wordBank); //find a random word not used yet.
    this.searchBank = this.helpers.initSearchBank(this.theWord);
    this.guessesRemaining = searchBank.trueChars + 5; //length of the word not counting spaces + 5
  },

  //--- get the guess from an event
  //--- add guess to the chars guessed array
  //--- subtract from guesses remaining
  "getGuess" : function(event) {
    this.userGuess = event.target.value.toString();
    this.charsGuessed.push(aChar);
    this.guessesRemaining--;
    console.log("userGuess = "+this.userGuess);
  },

  "gameOver" : function() {
      return this.guessesRemaining === 0 ? true : false;
    },

  //--- returns true if number of correct guesses = number of chars not spaces
  //
  "victory" : function() {
    return  this.charsCorrect === this.searchBank.trueChars[0] ? true : false;
  }


/*
  "gameAction" : function(event,theKeys) {
    if (event.target === theKeys.toString()) {
      userGuess = event.target.value.toString();
      this.checkWord2(this.searchBank,this.userGuess);

    }

  }*/


};

//************* end of Game object *******************


var hangMan = function () {
  var keyboard = document.querySelector("#keyboard");
  game.gameInit();
  game.gameAction(event,keyboard);
  keyboard.addEventListener("click",game.getGuess(event));
  if (game.checkWord2(game.searchBank,game.userGuess)[0] === true) {

      game.displayLetters();
  }
  if (game.victory()){
    game.displayWin();
    game.gameInit();
    } else if (game.gameOver()) {
      game.displayLose();
      game.gameInit();
    }
}



//Go GO Hangman
if (hangMan() === false) {
  hangMan();
}


