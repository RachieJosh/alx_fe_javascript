// Quotes Array (Initial Set)
const quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "inspiration",
  },
  {
    text: "Life is 10% what happens to us and 90% how we react to it.",
    category: "life",
  },
  {
    text: "Good, better, best. Never let it rest. 'Til your good is better and your better is best.",
    category: "motivation",
  },
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = quotes[randomIndex].text;
}

// Function to populate categories dropdown
function populateCategories() {
  const categories = [...new Set(quotes.map((quote) => quote.category))]; // Unique categories
  const categoryFilter = document.getElementById("categoryFilter");

  // Clear previous categories to avoid duplicates
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // Append each category to the dropdown
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on category
function filterQuotesByCategory() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((quote) => quote.category === selectedCategory);

  // Display a random quote from the filtered list
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = filteredQuotes[randomIndex].text;
}

// Function to add a new quote dynamically
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    // Add the new quote to the quotes array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Repopulate categories dropdown in case new category was added
    populateCategories();

    // Optionally, show the new quote immediately
    document.getElementById("quoteDisplay").textContent = newQuoteText;
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  populateCategories(); // Populate categories on page load
  showRandomQuote(); // Show a random quote on page load

  // Event listener for showing a new random quote
  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
});
