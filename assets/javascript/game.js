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
  // the search bank object
  "searchBank" : {},

 //---------Object of Helper Functions for Game ------------
    //--- these functions have no side effects ----

    //--- return a random value from an array
    // pass the array of possible words/phrases

    "randomWord": function(anArray) {
      return anArray[Math.floor(Math.random() * anArray.length)];
    },

    //--- takes a string and returns an object consisting of distinct characters as keys
    //--- with an array of that characters indices in the given string
    //--- will also return the position of spaces
    //--- "trueChars" = the number of characters that aren't spaces.
    //--- pass the word or phrase chosen
    //--- ['character', index of char occurence 1, index of char occurence 2, etc...]
    //--- The string "Hello" would produce: obj {h:[h,0],e[e,1],[l,2,3],[o,4]};
    "initSearchBank": function(aString) {
        // initialize the object
        var obj = {"trueChars": 0};
        // run through the string characters
        for(var i = 0; i < aString.length; i++) {
           // get the current character from string position i
           var iChar = aString[i].toLowerCase();
           // does the character already exist as a property of the object?
           if (obj.hasOwnProperty(iChar)){
            // push the index of the current character into object property named after the character
            obj[iChar].push(i);
            }
            // the character hasn't been processed into the object yet
            else {
              // position zero is the character itself
              obj[iChar]=[iChar];
              // push the index of the character into index 1 of the array
              obj[iChar].push(i);
              }
        }
        // get a count of the characters that aren't spaces.
        for (x in obj){
          // don't want to look at the space property or the trueChars property
          if ((x != " ") && (x != "trueChars")) {
            // add the length of the array associated with the given property but
            // subtract 1 for the first index which contains the character.
            obj["trueChars"]+=(obj[x].length)-1;
          }
        }
        // spit out the object just created
        return obj;
      },

  //--- tests to see if char was already guessed
  "validGuess": function(anArray,aChar) {
    if (anArray.includes(aChar)) {
      alert("You already chose that letter dumb dumb.");
      return false;
      } else {
        return true;
      }
  },

/* **************** end of helpers ************** */


  /* --- word checker receives a search bank and character
  //--- returns false if the char doesn't exist in the bank
  //--- deducts from wrong guesses allowed
  //--- if correct returns an array with the first index holding true and the
  //--- second index holding an array of that character's indices in the word
  //--- increases the correct letter count
  //-- pass it the search bank and a character  */
 "checkWord": function() {
    if (this.searchBank.hasOwnProperty(this.userGuess)) {
      console.log("chars correct begin of checkword = "+this.charsCorrect);
      // if the guess is correct add the length of the searchbank array -1 to the characters guessed
      // running total for matching to conclude victory. -1 because first index of array is
      // equal to the character.
      this.charsCorrect+=(this.searchBank[this.userGuess]).length-1;
      console.log("chars correct after increment = "+this.charsCorrect);
      return true;
    } else {
      this.failChances--;
      return false;
    }
  },

  //--- returns the word for use in the round and flags it as used by
  //--- adding it to the wordsUsed array.
  "grabWord": function(anArray) {
    var theGet = this.randomWord(anArray);
    console.log("the word picked "+theGet);
    if (this.wordsUsed.indexOf(theGet) != -1) {
      console.log("already used that word");
      return this.grabWord(anArray);
    } else {
        console.log("the word hadn't been used yet.");
        this.wordsUsed.push(theGet);
        console.log("first index of wordsUsed "+this.wordsUsed[0]);
        console.log(typeof this.wordsUsed[0]);
        this.theWord=theGet.toString();
        console.log("the word of the game is "+this.theWord);
    }
  },

  //--- initialize all the game variables and set up the search bank for
  //--- testing user guesses



  //--- adds the guess to the list of chars already guessed
  "processGuess": function() {
        this.charsGuessed.push(this.userGuess);
        console.log("userGuess = "+this.userGuess);
  },

  "gameOver": function() {
    if (this.failChances < 0) {
      return true;
    } else {
        return false;
      }
  },

  //--- returns true if number of correct guesses = number of chars that aren't spaces
  //
  "victory": function() {
    if (this.charsCorrect === this.searchBank.trueChars) {
      return true;
    } else {
        return false;
      }
  },

  //--- create the placholder spaces for the word
  "displayPlaceholders": function()
  {
    var thePlaceholder = document.getElementById("placeHolder");
    for (var x = 0; x < this.theWord.length; x++)
    {
      var blankLetter = document.createElement("div");
      blankLetter.setAttribute("class","letSpace");
      blankLetter.setAttribute("data",x);
      var wordSpace = document.createElement("div");
      wordSpace.setAttribute("class","justSpace");
      wordSpace.setAttribute("data",x);
      // if its a character place a line, if it's a space place an opaque line
      if (this.theWord[x] != " ") {
        thePlaceholder.appendChild(blankLetter);
        } else {
            thePlaceholder.appendChild(wordSpace);
          }
    }
  },

  "displayLetters": function() {
    // grab the placeholder div
    var thePlaceholder = document.getElementById("placeHolder");
    console.log("thePlaceholder = "+thePlaceholder);
    var iChar = this.userGuess;
    console.log("iChar = "+this.userGuess);
    // get the array of indexes from the object at property matching user guess
    var arrayOfIndices = this.searchBank[iChar];
    console.log("array of indices to replace with letters = "+arrayOfIndices);
    // get number of occurences of the user guess, -1 bcz first index is the char itself
    var numOfOccur = (arrayOfIndices.length)-1;
    console.log("number of time char in word = "+numOfOccur);
    // get the indices of the matching letter from the searchBank
    // start x at 1 because index 0 contains the character
    for (var x = 1; x <= numOfOccur; x++)
    {
      // set the targetvalue to index recorded in index x of the array
      var targetValue = arrayOfIndices[x];
      console.log(targetValue);
      // set replacespace to the doc space that has a data attr matching the guess
      var replaceSpace = document.querySelector('div[data="'+targetValue+'"]');
      console.log(document.querySelector('div[data="'+targetValue+'"]'));
      // build the new node with the user guess step by step
      var revealChar = document.createElement("h2");
      var theKeyNode = document.createTextNode(iChar);
      revealChar.appendChild(theKeyNode);
      // replace the spaceholder with the character
      replaceSpace.parentNode.replaceChild(revealChar,replaceSpace);
    }
    console.log("done with displaying letters");
  },

  "displayResult": function() {
    var youWinBro = "You Win Bro!";
    var sorryBro = "Awww, words are hard.";
    if (this.victory()) {
      document.getElementById("result").innerHTML = youWinBro;
    } else
      document.getElementById("result").innerHTML = sorryBro;
  },

 "runAction": function(event) {
    // assign the data attribute of the key pressed to userGuess
    // data values are the same as the key letter
    hangMan.userGuess = event.target.getAttribute("data");
    console.log(hangMan.userGuess);
    // validate the guess first to run the rest of the game
    if (hangMan.validGuess(hangMan.charsGuessed,hangMan.userGuess)) {
      // process the guess
      console.log("guess is valid");
      hangMan.processGuess();
      console.log("guess processed");
      // see if the guess is correct- if statement runs the function with side effects
      if (hangMan.checkWord()) {
        // if its correct reveal the characters, otherwise alert
        hangMan.displayLetters();
        console.log("num of correct guessed = "+hangMan.charsCorrect);
        console.log("correct chars needed = "+hangMan.searchBank.trueChars);
      } else alert("sorry bro");
    }
    // check to see if the game is over and show the result.
    if ((hangMan.victory()) || (hangMan.gameOver())){
        hangMan.displayResult();
      }
  },

  "gameInit": function() {
      this.charsGuessed = [];
      this.charsCorrect = 0;
      console.log("chars correct at game init = "+this.charsCorrect);
      console.log("made it this far");
      this.grabWord(this.wordBank);
      console.log("about to init searchBank with: "+this.theWord);
      this.searchBank = Object.assign({},(this.initSearchBank(this.theWord)));
      console.log(this.searchBank);
      this.displayPlaceholders();
      this.failChances = 6;
    },

  "testfunc": function(){
    alert("this does work.");
  },

  //--- ****** this drives everything: call to run the game ******
  "engine": function() {
    var keyboard = document.getElementById("keyboard");
    // initialize the game
    this.gameInit();
    //console.log(this.theWord);
    // add event listener and run getGuess whenever letters are clicked
    keyboard.addEventListener("click",this.runAction);

  }

};

hangMan.engine();
