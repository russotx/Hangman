
var hangMan = {

  //------Game Data---------
  "wordBank"           : ["Willie Nelson","Johnny Cash","Waylon Jennings"],
  "failChances"        : 0,  // number of wrong guesses allowed
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
    "initSearchBank" : function(aString) {
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



    //--- returns the number of spaces in the word/phrase
    // pass the word/phrase
    "numOfSpaces" : function(aString) {
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
  //--- word checker receives a search bank and character
  //--- returns false if the char doesn't exist in the bank
  //--- deducts from wrong guesses allowed
  //--- if correct returns an array with the first index holding true and the
  //--- second index holding an array of that character's indices in the word
  //--- increases the correct letter count
  //-- pass it the search bank and a character
  "checkWord2" : function() {
    return this.searchBank.hasOwnProperty(this.userGuess) ? ([true,this.searchBank[this.userGuess]],
                                          this.charsCorrect++) :
                                          (this.failChances--,
                                            false);
  },

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
    this.displayPlaceholders();
    this.failChances = 6; //chances to guess wrong.
  },

  //--- get the guess from an event
  //--- add guess to the chars guessed array
  //--- subtract from guesses remaining
  "getGuess" : function(event) {
    this.userGuess = event.target.value.toString();
  },

  //--- tests to see if char was already guessed
  "validGuess" : function() {
    if (this.charsGuessed.includes(this.userGuess)) {
      alert("You already chose that letter dumb dumb.");
      return false;
      } else {
        return true;
      }
  },

  //--- adds the guess to the list of chars already guessed
  "processGuess" : function() {
        this.charsGuessed.push(this.userGuess);
        console.log("userGuess = "+this.userGuess);
  },

  "gameOver" : function() {
    return this.failChances < 0 ? true : false;
    },

  //--- returns true if number of correct guesses = number of chars not spaces
  //
  "victory" : function() {
    return this.charsCorrect === this.searchBank.trueChars[0] ? true : false;
  },

  "displayPlaceholders" : function() {
      thePlaceholder = document.getElementByID("#placeholder");
      for(var x = 0; x < this.theWord.length; x++) {
        var newS = document.createElement("span");
        newS.setAttribute("value",searchBank[theWord[x][0]]);
        if (searchBank[theWord[x]] != " ") {
          var node = document.createTextNode("_____ ");
        } else {
            var node = document.createTextNode("      ");
        }
        newS.appendChild(node);
        thePlaceholder.appendChild(newS);
      }

      document.getElementByID("#placeholder").innerHTML =
  },

  "displayLetters" : function() {
    for (var i=0; i< (searchBank[userGuess]).length; i++) {
      var spaces = document.getElementByID("#placeHolder");
      if (spaces.value == (searchBank[userGuess])[i]) {
        spaces.innerHTML = "__"+userGuess+"__";
      }
    }

  },

  "displayResult": function() {
    var youWinBro = "You Win Bro!";
    var sorryBro = "Awww, words are hard.";
    if (this.victory()) {
      document.getElementById("#result").innerHTML = youWinBro;
    } else
      document.getElementById("#result").innerHTML = sorryBro;
  },

  //--- ****** this drives everything: call to run the game ******
  "engine" : function() {
    var keyboard = document.querySelector("#keyboard");
    this.gameInit();
    keyboard.addEventListener("click", this.getGuess(event));
    if(this.validGuess()) {
      this.processGuess();
      if ((this.checkWord2())[0] === true) {
        this.displayLetters();
      } else {
        alert("Sorry Bro.");
      }
      if (this.victory() || this.gameOver()) {
        this.displayResult();
        this.gameInit();
      }
    }
  }

};

//************* end of Game object *******************

/*
var hangMan = function () {
  var keyboard = document.querySelector("#keyboard");
  game.gameInit();
  keyboard.addEventListener("click",game.action());
}; */

/*
  if(game.validGuess()) {
    game.processGuess();
    if ((game.checkWord2())[0] === true) {
      game.displayLetters();
    } else {
      alert("Sorry Bro.");
    }
    if (game.victory()){
      game.displayWin();
      game.gameInit();
    } else if (game.gameOver()) {
        game.displayLose();
        game.gameInit();
    }
  }
};*/



hangMan.engine();

