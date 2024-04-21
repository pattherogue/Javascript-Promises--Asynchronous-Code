document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', () => {
        const favoriteNumber = document.getElementById('favorite-number').value;
        if (!favoriteNumber) {
            alert('Please enter a number.');
            return;
        }

        const getFavoriteNumberFact = getNumberFact(favoriteNumber);

        getFavoriteNumberFact.then(favoriteNumberFact => {
            displayFact(favoriteNumberFact);

            const numberFactsPromises = [
                getNumberFact(42),
                getNumberFact(100),
                getNumberFact(2022)
            ].map(getNumberFact);

            Promise.all(numberFactsPromises)
                .then(numberFacts => displayFacts(numberFacts))
                .catch(error => console.error('Error:', error));

            getUniqueNumberFacts(favoriteNumber)
                .then(favoriteNumberFacts => displayFacts(favoriteNumberFacts, true))
                .catch(error => console.error('Error:', error));
        }).catch(error => console.error('Error:', error));
    });
});

function getNumberFact(number) {
    return new Promise((resolve, reject) => {
        fetch(`http://numbersapi.com/${number}?json`)
            .then(response => response.json())
            .then(data => resolve(data.text))
            .catch(error => reject(error));
    });
}

function getUniqueNumberFacts(number) {
    return new Promise((resolve, reject) => {
        const uniqueFacts = new Set();
        const fetchFacts = async () => {
            while (uniqueFacts.size < 4) {
                try {
                    const fact = await getNumberFact(number);
                    uniqueFacts.add(fact);
                } catch (error) {
                    reject(error);
                }
            }
            resolve(Array.from(uniqueFacts));
        };
        fetchFacts();
    });
}

function displayFact(fact) {
    const numberFactsDiv = document.getElementById('number-facts');
    const factElement = document.createElement('p');
    factElement.textContent = fact;
    numberFactsDiv.appendChild(factElement);
}

function displayFacts(facts, clearPrevious = false) {
    const numberFactsDiv = document.getElementById('number-facts');
    if (clearPrevious) {
        numberFactsDiv.innerHTML = '';
    }
    facts.forEach(fact => {
        const factElement = document.createElement('p');
        factElement.textContent = fact;
        numberFactsDiv.appendChild(factElement);
    });
}
