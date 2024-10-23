const serverUrl = "https://jsonplaceholder.typicode.com/posts";

// Check if quotes are stored in localStorage; if not, use default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "inspiration",
  },
  {
    text: "Life is 10% what happens to us and 90% how we react to it.",
    category: "life",
  },
];

// Save quotes to localStorage
function saveQuotesToLocalStorage() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Use innerHTML to display the quote text dynamically
  quoteDisplay.innerHTML = `<p>${quotes[randomIndex].text}</p>`;
}

// Add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);

    // Save locally and post to the server
    saveQuotesToLocalStorage();
    postQuoteToServer(newQuote);

    // Use innerHTML to show the new quote
    document.getElementById(
      "quoteDisplay"
    ).innerHTML = `<p>${newQuoteText}</p>`;
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Fetch quotes from server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(serverUrl);
    const serverQuotes = await response.json();

    // Resolve conflicts and sync local storage
    resolveConflicts(serverQuotes);
  } catch (error) {
    console.error("Error fetching data from server:", error);
  }
}

// Post new quote to server
async function postQuoteToServer(newQuote) {
  try {
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuote),
    });

    const data = await response.json();
    console.log("New quote posted to server:", data);
  } catch (error) {
    console.error("Error posting data to the server:", error);
  }
}

// Sync data with server periodically
function syncQuotes() {
  fetchQuotesFromServer().then(() => {
    console.log("Quotes synced with server!");
  });
}

// Call syncQuotes periodically
setInterval(syncQuotes, 10000); // Sync every 10 seconds

// Resolve conflicts by giving server data precedence
function resolveConflicts(serverQuotes) {
  const combinedQuotes = [...serverQuotes];
  localStorage.setItem("quotes", JSON.stringify(combinedQuotes));
  console.log("Quotes synced with server!");
  alert("Data synced with the server. Conflicts have been resolved.");
}

// DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  showRandomQuote();
  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
});
