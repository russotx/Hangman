

var gameObject = {

  //------Game Data---------
  "wordBank"           : ["Willie Nelson","Johnny Cash","Waylon Jennings"],
  "guessesRemaining"   : 0,  // at least the length of the word + 5
  "charsGuessed"       : [],
  "charsCorrect"       : [],
  "theWord"            : "",
  "wordsUsed"          : [], // words already used
  "searchBank"         : {},

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

   //---------Object of Helper Functions for Game Engine ------------
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
             iChar = aString[i].toLowerCase();
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
        }

      //--- check for guesses remaining > 0
      // pass number of guesses
      "gameOver" : function(aNum) {
        return aNum === 0 ? true : false;
      },

      //--- returns true if number of correct guesses = length of the word/phrase
      // pass number of correct characters & length of the word/phrae
      "victory" : function(aString, aNum) {
        return aNum === aString.length() ? true : false;
      },

      //---returns true if the choice is in the word/phrase at all
      // pass the word/phrase & the user's char choice
      "checkWord" : function(aString,aChar) {
        return aString.indexOf(aChar.toLowerCase()) === -1 ? false : true;
      },

      //--- efficient word checker receives a search bank and character
      //--- returns false if the char doesn't exist in the bank
      //--- returns an array with the first index holding true and the
      //---   second index holding an array of that character's indices in the word
      "checkWord2" : function(anObj,aChar) {
        return anObj.hasOwnProperty(aChar) ? [true,anObj[aChar]] : false;
      }

      //--- returns the number of spaces in the word/phrase
      // pass the word/phrase
      "numOfSpaces" : function (aString) {
        return aString.includes(" ") ? aString.match((/ /g) || []).length
                                             : [0,0];
      }

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
    },

  //---------- gameObject methods -----------

  //--- returns the word for use in the round and flags it as used by
  //--- adding it to the wordsUsed array.
  "grabWord" : function(anArray) {
    var theGet = this.helpers.randomWord(anArray);
    return wordsUsed.indexOf(theGet) != -1 ? (console.log("already used that word"), grabWord(anArray)) :
                                             (wordsUsed.push(theGet.toString()), theWord=theGet.toString());
  }

  //--- initialize all the game variables and set up the search bank for
  //--- testing user guesses
  "gameInit" : function() {
    this.charsGuessed = 0;
    this.charsCorrect = 0;
    this.theWord = this.grabWord(this.wordBank); //find a random word not used yet.
    this.searchBank = this.helpers.initSearchBank(this.theWord);
    this.guessesRemaining = searchBank.trueChars + 5; //length of the word not counting spaces + 5
  },

  "gameEngine" : function() {
    this.gameInit();

  },

};



