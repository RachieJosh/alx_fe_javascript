// Array to hold quotes
let quotes = [];

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerText =
      "No quotes available. Please add some!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.getElementById(
    "quoteDisplay"
  ).innerText = `${randomQuote.text} - ${randomQuote.category}`;
}

// Function to add a new quote
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  if (quoteText === "" || quoteCategory === "") {
    alert("Please enter both a quote and a category!");
    return;
  }

  // Create a new quote object and add it to the quotes array
  const newQuote = { text: quoteText, category: quoteCategory };
  quotes.push(newQuote);

  // Clear the input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Optionally, show the new quote immediately
  showRandomQuote();
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
