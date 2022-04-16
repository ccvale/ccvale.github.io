document.addEventListener('DOMContentLoaded', () => {
    
    //TODO: make keyboard usable

    createSquares();
    getNewWord();

    let guessedWords = [[]];
    let guessedLetters = [];
    let availableSpace = 1;
    let attempts = 0;
    let word;

    const keys = document.querySelectorAll('.keyboard-row button');

    function getNewWord() {
        fetch(
          `https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=5&lettersMax=5`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
              "x-rapidapi-key": 'a17c43929bmsh5f47e5be9a81183p11b0a9jsn89ff621f42f4',
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((res) => {
            word = res.word;
          })
          .catch((err) => {
            console.error(err);
          });
      }

    function getCurrentWordArray() {
        const numGuessedWords = guessedWords.length;
        return guessedWords[numGuessedWords-1];
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArray();
        
        if(currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        }
    };

    function countInstances(letter, word) {
        return (word.split(letter).length - 1) > 1;
     }

    function getTileColor(letter, index) {
        //TODO: make it so that when all double letters are found, it makes them yellow and not orange
        let foundDoubleLetter = false;
        const isCorrectLetter = word.includes(letter);
        const isDoubleLetter = countInstances(letter, word);

        guessedLetters.push(letter);

        if(!isCorrectLetter && !isDoubleLetter) {
            return 'rgb(58,58,60)';
        }

        const letterPosition = word.charAt(index);
        const correctPosition = letter === letterPosition;

        if(correctPosition) {
            return 'rgb(83, 141, 78)';
        }
        else if(!correctPosition && isDoubleLetter && !foundDoubleLetter && guess) {
            return 'rgb(218,130,46)';
        }
        else {
            return 'rgb(181, 159, 59)'
        }
    }


    function handleSubmit() {
        const currentWordArr = getCurrentWordArray();

        if (currentWordArr.length !== 5) {
            window.alert('Word must be 5 letters!');
            return;
        }

        const currentWord = currentWordArr.join('');

        fetch(`https://wordsapiv1.p.rapidapi.com/words/${currentWord}`, {
        method: "GET",
         headers: {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "a17c43929bmsh5f47e5be9a81183p11b0a9jsn89ff621f42f4",
        },
        })
        .then((res) => {
        if (!res.ok) {
          throw Error();
        }

        const firstLetterID = attempts * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            guessedLetters.push(letter);
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);
                const letterID = firstLetterID + index;
                const letterEl = document.getElementById(letterID);
                letterEl.classList.add('animate__flipInX');
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`
            }, interval * index + 200);
        });

        if(guessedWords.length === 6) {
            window.alert(`Sorry, no more guesses! The word was ${word}!`);
            return;
        }

        guessedLetters.forEach((letter) => {
            setTimeout(() => {
                const letterEl = document.getElementById(letter);
                console.log(letterEl);
                letterEl.style = 'background-color:rgb(58,58,60);border-color:rgb(58,58,60)'
            }, interval);
        });

        attempts += 1;
        guessedWords.push([]);
        if(currentWord === word) {
            window.alert(`Wordle completed in ${attempts} attempts!`);
            return;
        }
    }).
    catch(() => {
        window.alert('Word is not recognized!');
        return;
    });
}

    function createSquares() {
        const gameBoard = document.getElementById('board');
        
        for (let index = 0; index < 30; index++) {
            let square = document.createElement('div');

            square.classList.add('square');
            square.classList.add('animate__animated'); 
            square.setAttribute('id', index + 1);
            gameBoard.appendChild(square);
        }
    }

    function handleDelete() {
        //make sure you cant delete things already typed
        const currentWordArr = getCurrentWordArray();

        if (currentWordArr.length !== 0) {
            const removedLetter = currentWordArr.pop();
            guessedWords[guessedWords.length - 1] = currentWordArr;

            const lastLetterEl = document.getElementById(String(availableSpace-1));
            lastLetterEl.textContent = '';
            availableSpace -= 1;
        }
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = keys[i].textContent;

            if (letter === 'Enter') {
                handleSubmit();
                return;
            }

            if (letter === 'Del') {
                handleDelete();
                return;
            }

            updateGuessedWords(letter);
        };
    }

    document.addEventListener('keydown', (e) => {
        if('qwertyuiopasdfghjklzxcvbnm'.includes(e.key)) {
            updateGuessedWords(e.key);
        }
        else if (e.key === 'Enter') {
            handleSubmit();
            return;
        }

        else if (e.key === 'Backspace') {
            handleDelete();
            return;
        }
        
      });
});