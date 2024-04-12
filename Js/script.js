// Get the search form and input field
const searchForm = document.querySelector("form");
const searchInput = document.querySelector('input[name="q"]');

// Add an event listener to the search form
searchForm.addEventListener("submit", async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the user's search query
  const query = searchInput.value.trim();

  // Check if the query is not empty
  if (query) {
    // Make a GET request to the Google Books API
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=search+query`
    );

    // Check if the request was successful
    if (response.ok) {
      // Parse the response as JSON
      const data = await response.json();

      // Get the container for the book results
      const bookContainer = document.querySelector(".book-container");

      // Loop through the book data and create HTML elements for each book
      data.items.forEach((book) => {
        // Create a new div for the book
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        // Create a new img for the book cover
        const bookCover = document.createElement("img");
        bookCover.src = book.volumeInfo.imageLinks.thumbnail;
        bookCover.alt = book.volumeInfo.title;

        // Create a new div for the book details
        const bookDetails = document.createElement("div");
        bookDetails.classList.add("book-details");

        // Create a new h3 for the book title
        const bookTitle = document.createElement("h3");
        bookTitle.textContent = book.volumeInfo.title;

        // Create a new p for the book author
        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = book.volumeInfo.authors;

        // Append the book details elements to the book details div
        bookDetails.appendChild(bookTitle);
        bookDetails.appendChild(bookAuthor);

        // Append the book cover and book details to the book div
        bookDiv.appendChild(bookCover);
        bookDiv.appendChild(bookDetails);

        // Append the book div to the book container
        bookContainer.appendChild(bookDiv);
      });
      // Do something with the book data (e.g. display it on the page)
      console.log(data);
    } else {
      // Handle the error
      console.error(`Error: ${response.statusText}`);
    }
  }
});
