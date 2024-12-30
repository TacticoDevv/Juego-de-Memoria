document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        '🍎', '🍌', '🍇', '🍉', 
        '🍎', '🍌', '🍇', '🍉',
        '🍓', '🍒', '🥝', '🍑',
        '🍓', '🍒', '🥝', '🍑'
    ];
    const gameBoard = document.getElementById('gameBoard');
    const startButton = document.getElementById('startButton');
    const timerDisplay = document.getElementById('timer');
    const attemptsDisplay = document.getElementById('attempts');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let attempts = 0;
    let time = 0;
    let interval;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startGame() {
        gameBoard.innerHTML = '';
        shuffle(cardsArray).forEach(symbol => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
        attempts = 0;
        time = 0;
        attemptsDisplay.textContent = attempts;
        timerDisplay.textContent = time;
        clearInterval(interval);
        interval = setInterval(() => {
            time++;
            timerDisplay.textContent = time;
        }, 1000);
    }

    function flipCard() {
        if (lockBoard) return;
        this.classList.add('flip');
        this.textContent = this.dataset.symbol;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        attempts++;
        attemptsDisplay.textContent = attempts;
        checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
        if (document.querySelectorAll('.card:not(.flip)').length === 0) {
            clearInterval(interval);
            alert(`¡Felicidades! Completaste el juego en ${time} segundos y ${attempts} intentos.`);
        }
    }

    startButton.addEventListener('click', startGame);
});
