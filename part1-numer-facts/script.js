// Part 1: Number Facts

// 1. Make a request to the Numbers API to get a fact about your favorite number.
const favoriteNumber = 7; // Change this to your favorite number
fetch(`http://numbersapi.com/${favoriteNumber}?json`)
  .then(response => response.json())
  .then(data => {
    document.getElementById('single-fact').textContent = data.text;
  })
  .catch(error => console.error('Error fetching data:', error));

// 2. Figure out how to get data on multiple numbers in a single request.
const numbers = [1, 2, 3, 4, 5]; // Example array of numbers
const promises = numbers.map(number =>
  fetch(`http://numbersapi.com/${number}?json`)
    .then(response => response.json())
);

Promise.all(promises)
  .then(facts => {
    const multipleFactsList = document.getElementById('multiple-facts');
    facts.forEach(fact => {
      const li = document.createElement('li');
      li.textContent = fact.text;
      multipleFactsList.appendChild(li);
    });
  })
  .catch(error => console.error('Error fetching data:', error));

// 3. Use the API to get 4 facts on your favorite number.
const favoriteNumberFactsPromises = Array.from({ length: 4 }, () =>
  fetch(`http://numbersapi.com/${favoriteNumber}?json`)
    .then(response => response.json())
);

Promise.all(favoriteNumberFactsPromises)
  .then(facts => {
    const favoriteFactsList = document.getElementById('favorite-facts');
    facts.forEach(fact => {
      const li = document.createElement('li');
      li.textContent = fact.text;
      favoriteFactsList.appendChild(li);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
