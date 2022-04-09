document.addEventListener('DOMContentLoaded', () => {

    //TODO: make keyboard usable

    createSquares();
    const keys = document.querySelectorAll('.keyboard-row button');
    const squares = document.querySelectorAll('square animate__animated');
    
    let clicked = 0;
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute('data-key');

            if (letter === 'enter') {
                clicked++;
                console.log(clicked);
                if (clicked == 5) {
                    window.location.href = "/valdle/valdle.html";
                    window.alert(`Congratulations! You have found my secret (sorta) Wordle Clone! The orange tiles in my version indicate double letters...It was the only change I wanted to add on to the fundamentals of the game! You can click on VALDLE to return back to the main page at any time! Enjoy!`);

                }
            }
        }
    }

    function getTileColor(letter, index) {
        let word = 'HIRED✓';
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
                    'L', 'E', 'A', 'D', 'E', 'R',
                    'T', 'E', 'C', 'H', 'I', 'E',
                    'W', 'R', 'I', 'T', 'E', 'R',
                    'A', 'C', 'T', 'I', 'V', 'E',
                    'D', 'R', 'I', 'V', 'E', 'N',
                    'H', 'I', 'R', 'E', 'D', '✓'
                    ]
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
            }, 200 * index + 400);
        }
    }
});