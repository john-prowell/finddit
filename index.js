import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form Event Listener
searchForm.addEventListener('submit', (e) => {
  // Get search term
  const searchTerm = searchInput.value;
  // Get sort by
  // gets all inputs with name "sortby" then the value of the one that is checked.
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get Limit Value
  const searchLimit = document.getElementById('limit').value;
  // Check if form empty
  if (searchTerm === '') {
    // Show Message
    showMessage('Please add a search term', 'alert-danger');
  }
  // Clear Search Input
  searchInput.value = '';
  // Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
      let output = '<div class="card-columns">';
      // Loop through posts
      results.forEach(post => {
        // check for image
        const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
        output += `
        <div class="card">
          <img class="card-img-top" src="${image}" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 100)}</p>
          <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
          <hr>
          <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
          <span class="badge badge-dark">Score: ${post.score}</span>
          </div>
        </div>
        `;
      });
      output += '</div>';
      document.getElementById('results').innerHTML = output;
    });

  e.preventDefault();
});

// Show Message function
const showMessage = (message, className) => {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`; // classes alert alert-danger
  // Add text node
  div.appendChild(document.createTextNode(message)); // appends message to div
  // Get Parent Container
  const searchContainer = document.getElementById('search-container');
  // Get search 
  const search = document.getElementById('search');
  // Insert div - message
  searchContainer.insertBefore(div, search);
  // Timeout alert, Removes Alert Message in 3 seconds
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
};

// Truncate Text
const truncateText = (text, limit) => {
// search for first space after character limit
  const shortened = text.indexOf(' ', limit); //string.indexOf(searchvalue, start)
  if (shortened == -1) { // if there is no space after the character limit
    return text; // return all the text
  }
// otherwise return the text up until the first space after the character limit.
// so no ending word is not cut off
  return text.substring(0, shortened);
}