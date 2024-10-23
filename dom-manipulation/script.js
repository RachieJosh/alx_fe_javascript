const serverUrl = 'https://jsonplaceholder.typicode.com/posts';

// Check if quotes are stored in localStorage; if not, use default
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "life" },
];

// Save quotes to localStorage
function saveQuotesToLocalStorage() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quoteDisplay').textContent = quotes[randomIndex].text;
}

// Add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);

        // Save locally and post to the server
        saveQuotesToLocalStorage();
        postQuoteToServer(newQuote);

        // Show the new quote
        document.getElementById('quoteDisplay').textContent = newQuoteText;
    } else {
        alert('Please enter both a quote and a category.');
    }
}

// Fetch quotes from server
async function fetchQuotesFromServer() {
    const response = await fetch(serverUrl);
    const serverQuotes = await response.json();

    // Resolve conflicts and sync local storage
    resolveConflicts(serverQuotes);
}

// Post new quote to server
async function postQuoteToServer(newQuote) {
    const response = await fetch(serverUrl, {
        method: 'POST',
        body: JSON.stringify(newQuote),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    const data = await response.json();
    console.log('New quote posted to server:', data);
}

// Sync data with server periodically
function syncData() {
    fetchQuotesFromServer();
    console.log('Syncing data with server...');
}
setInterval(syncData, 10000); // Sync every 10 seconds

// Resolve conflicts by giving server data precedence
function resolveConflicts(serverQuotes) {
    const combinedQuotes = [...serverQuotes];
    localStorage.setItem('quotes', JSON.stringify(combinedQuotes));
    alert('Data synced with the server. Conflicts have been resolved.');
}

// DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
});

