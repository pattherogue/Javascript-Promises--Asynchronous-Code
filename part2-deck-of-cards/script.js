document.addEventListener('DOMContentLoaded', () => {
    const drawCardBtn = document.getElementById('draw-card-btn');
    const resetDeckBtn = document.getElementById('reset-deck-btn');
    const cardsDiv = document.getElementById('cards');

    let deckId;

    drawCardBtn.addEventListener('click', () => {
        if (!deckId) {
            createDeck()
                .then(newDeckId => {
                    deckId = newDeckId;
                    return drawCard(deckId);
                })
                .then(cardData => displayCard(cardData))
                .catch(error => console.error('Error:', error));
        } else {
            drawCard(deckId)
                .then(cardData => displayCard(cardData))
                .catch(error => console.error('Error:', error));
        }
    });

    resetDeckBtn.addEventListener('click', () => {
        resetDeck();
    });

    function createDeck() {
        return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(response => response.json())
            .then(data => data.deck_id);
    }

    function drawCard(deckId) {
        return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(response => response.json())
            .then(data => data.cards[0]);
    }

    function displayCard(cardData) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.innerHTML = `
            <span class="card-value">${cardData.value}</span>
            <span class="card-suit">${cardData.suit}</span>
        `;
        cardsDiv.appendChild(cardDiv);
    }

    function resetDeck() {
        deckId = undefined;
        cardsDiv.innerHTML = '';
    }
});
