// Part 2: Deck of Cards

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
fetch('https://deckofcardsapi.com/api/deck/new/draw/')
  .then(response => response.json())
  .then(data => {
    const card = `${data.cards[0].value} of ${data.cards[0].suit}`;
    document.getElementById('card-data').textContent = card;
  })
  .catch(error => console.error('Error fetching data:', error));

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck,
// then get one more card from the same deck.
fetch('https://deckofcardsapi.com/api/deck/new/draw/')
  .then(response => response.json())
  .then(data => {
    const deckId = data.deck_id;
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
  })
  .then(response => response.json())
  .then(data => {
    const firstCard = `${data.cards[0].value} of ${data.cards[0].suit}`;
    const secondCard = `${data.cards[1].value} of ${data.cards[1].suit}`;
    document.getElementById('card-data').textContent = `First card: ${firstCard}, Second card: ${secondCard}`;
  })
  .catch(error => console.error('Error fetching data:', error));
