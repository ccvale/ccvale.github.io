document.addEventListener('DOMContentLoaded', () => {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const grid = document.getElementById('board-container');
    }

    const word = 'hired✓';
    let hinted = false;
    let clicked = 0;
    const keys = document.querySelectorAll('.keyboard-row button');
    
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = () => {
            
            if (!hinted) {
                window.alert(`Click the ENTER button 5 times for a surprise...`);
                hinted = true;
                if (keys[i].textContent === 'Enter') {
                    clicked = -1;
                }
            }

            if (keys[i].textContent === 'Enter') {
                clicked++;
                if (clicked == 5) {
                    window.location.href = "../../templates/valdle.html"; //figure this out
                    window.alert(`Congratulations! You have found my secret version of Wordle! The orange tiles in my version indicate double letters...It was the only change I wanted to add on to the fundamentals of the game! You can click on VALDLE to return back to the main page at any time! Enjoy!`);
                }
            }
        }
    }

    function getTileColor(letter, index) {
        index = index % 6;
        const isCorrectLetter = word.includes(letter);
        
        if(!isCorrectLetter) {
            //gray it out
            return 'rgb(58,58,60)';
        }
        const correctPosition = letter === word.charAt(index);

        if(correctPosition) {
            //green
            return 'rgb(83, 141, 78)';
        }
        else {
            //yellow
            return 'rgb(181, 159, 59)'
        }
    }

    function createSquares() {
        let chars = [
                    'l', 'e', 'a', 'd', 'e', 'r',
                    'a', 'c', 't', 'i', 'v', 'e',
                    'd', 'r', 'i', 'v', 'e', 'n',
                    't', 'e', 'c', 'h', 'i', 'e',
                    'w', 'r', 'i', 't', 'e', 'r',
                    'h', 'i', 'r', 'e', 'd', '✓'
                    ]
        let set = new Set(chars);
        const gameBoard = document.getElementById('board');
        
        for (let index = 0; index < 36; index++) {
            let square = document.createElement('div');
            let tileColor = getTileColor(chars[index], index);
            
            square.classList.add('square');
            square.classList.add('animate__animated'); 
            square.setAttribute('id', index + 1);
            
            gameBoard.appendChild(square);

            setTimeout(() => {
                square.textContent = chars[index];
                square.classList.add('animate__flipInX');
                square.style = `background-color:${tileColor};border-color:${tileColor}`;
                if (set.has(chars[index])) {
                    try {
                        let squareID = document.getElementById(chars[index]);
                        if (word.includes(squareID.textContent)) {
                            squareID.classList.add('seen-found');
                        }
                        squareID.classList.add('seen-null');
                    }
                    catch (error) {
                        
                    }   
                }
            }, 200 * index + 300);
        }
    }
    createSquares();
});