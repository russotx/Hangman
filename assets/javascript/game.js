var hangMan = {

  //------Game Data---------
  "wordBank": ["Willie Nelson","Johnny Cash","Waylon Jennings"],
  // number of wrong guesses allowed
  "failChances": 0,
  // array of the chars user has guessed
  "charsGuessed": [],
   // number of the correct chars the user has guessed
  "charsCorrect": 0,
  // the active word that needs to be guessed
  "theWord": "",
  // words already used
  "wordsUsed": [],
  // the user's guess
  "userGuess": "",

 //---------Object of Helper Functions for Game ------------

    //--- return a random value from an array
    // pass the array of possible words/phrases

    "randomWord": function(anArray) {
      return anArray[Math.floor(Math.random() * anArray.length)];
    },

    /* -- takes a string and returns an object consisting of distinct characters as keys
    //--- with an array of that characters indices in the given string
    //--- will also return the position of spaces
    //--- "trueChars" = the number of characters that aren't spaces.
    //--- pass the word or phrase chosen  */

    "initSearchBank": function(aString) {
        var obj = {"trueChars" : 0};
        for(var i = 0; i < aString.length; i++) {
           var iChar = aString[i].toLowerCase();
           if (obj.hasOwnProperty(iChar)){
            obj[iChar].push(i);
            console.log("added another " + iChar + " to array");
            console.log("obj."+iChar+" now = "+obj[iChar]);

            } else {
              console.log("first occurrance of " + iChar);
              obj[iChar]=[];
              console.log("created empty array");
              obj[iChar].push(i);
              console.log("added " + iChar + " to array");
              console.log("obj."+iChar+" now = "+obj[iChar]);
              }
        }
        for (x in obj){
          if ((x != " ") && (x != "trueChars")) {
            obj["trueChars"]+=obj[x].length;
          }
        }
        return obj;
      },

/* **************** end of helpers ************** */


  /* --- word checker receives a search bank and character
  //--- returns false if the char doesn't exist in the bank
  //--- deducts from wrong guesses allowed
  //--- if correct returns an array with the first index holding true and the
  //--- second index holding an array of that character's indices in the word
  //--- increases the correct letter count
  //-- pass it the search bank and a character  */

  "checkWord2": function() {
    return this.searchBank.hasOwnProperty(this.userGuess) ? ([true,this.searchBank[this.userGuess]],
                                          this.charsCorrect++) :
                                          (this.failChances--,
                                            false);
  },

  //--- returns the word for use in the round and flags it as used by
  //--- adding it to the wordsUsed array.
  "grabWord": function(anArray) {
    var theGet = this.randomWord(anArray);
    return this.wordsUsed.indexOf(theGet) != -1 ? (console.log("already used that word"), this.grabWord(anArray)) :
                                             (this.wordsUsed.push(theGet.toString()), this.theWord=theGet.toString());
  },

  //--- initialize all the game variables and set up the search bank for
  //--- testing user guesses
  "gameInit": function() {
    this.charsGuessed = [];
    this.charsCorrect = 0;
    this.theWord = this.grabWord(this.wordBank);
    console.log("game init: the word is : "+this.theWord);
    this.searchBank = Object.assign({},(this.initSearchBank(this.theWord)));
    for (var x in (this.searchBank)){
      console.log(this.searchBank[x]);
    }
    this.displayPlaceholders();
    this.failChances = 6;

  },

  "getGuess": function(event) {
    this.userGuess = event.target.value;
  },

  //--- tests to see if char was already guessed
  "validGuess": function() {
    if (this.charsGuessed.includes(this.userGuess)) {
      alert("You already chose that letter dumb dumb.");
      return false;
      } else {
        return true;
      }
  },

  //--- adds the guess to the list of chars already guessed
  "processGuess": function() {
        this.charsGuessed.push(this.userGuess);
        console.log("userGuess = "+this.userGuess);
  },

  "gameOver": function() {
    return this.failChances < 0 ? true : false;
    },

  //--- returns true if number of correct guesses = number of chars not spaces
  //
  "victory": function() {
    return this.charsCorrect === this.searchBank.trueChars[0] ? true : false;
  },

  "displayPlaceholders": function()
  {
      var thePlaceholder = document.getElementById("placeHolder");
      console.log("we just created thePlaceholder: "+thePlaceholder);
      console.log("word length is : "+this.theWord.length);
      for (var x = 0; x < (this.theWord).length; x++)
      {
        var newS = document.createElement("SPAN");
        console.log("we just created newS: "+newS);
        console.log((this.searchBank[(this.theWord[x].toLowerCase())]));
        newS.setAttribute("class",this.searchBank[this.theWord[x][0]]);
        if (this.searchBank[this.theWord[x]] != " ")
        {
          var node = document.createTextNode("_____ ");
          newS.appendChild(node);
          thePlaceholder.appendChild(newS);
        } else
          {
            var node = document.createTextNode("      ");
            newS.appendChild(node);
            thePlaceholder.appendChild(newS);
          }
      }
      thePlaceholder.innerHTML = newS;
  },

  "displayLetters": function() {
    for (var i=0; i< (this.searchBank[this.userGuess]).length; i++) {
      var spaces = document.getElementByID("placeHolder");
      if (spaces.class == (this.searchBank[this.userGuess])[i]) {
        spaces.innerHTML = "__"+this.userGuess+"__";
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
  "engine": function()
  {
    var keyboard = document.getElementById("keyboard");

    this.gameInit();
    console.log(hangMan.theWord);
    console.log(hangMan.userGuess);
    keyboard.addEventListener("click", function(event)
    {
      console.log(hangMan.theWord);
      hangMan.userGuess = event.target.value;
      if(hangMan.validGuess())
      {
        hangMan.processGuess();
        if ((hangMan.checkWord2())[0] === true)
        {
          hangMan.displayLetters();
        } else
          {
           alert("Sorry Bro.");
          }
        if ((hangMan.victory()) || (hangMan.gameOver()))
        {
          hangMan.displayResult();
          hangMan.gameInit();
        }
      }
    });
  }

};

hangMan.engine();
