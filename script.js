
// Array to hold all movies data (add movie data here)
const movies = [
  { title: "Movie 1", category: "Action", image: "movie1.jpg" },
  { title: "Movie 2", category: "Comedy", image: "movie2.jpg" },
  { title: "Movie 3", category: "Horror", image: "movie3.jpg" },
  { title: "Movie 4", category: "TV", image: "movie4.jpg" },
  // Add more movies as needed
];

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to render movies
function renderMovies(category = 'All') {
  const movieGrid = document.getElementById('movie-grid');
  movieGrid.innerHTML = '';

  const filteredMovies = category === 'All' ? movies : movies.filter(movie => movie.category === category);
  filteredMovies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <button class="favorite-btn" onclick="toggleFavorite('${movie.title}')">❤️</button>
    `;
    movieGrid.appendChild(movieCard);
  });
}

// Function to toggle favorite
function toggleFavorite(movieTitle) {
  if (favorites.includes(movieTitle)) {
    favorites = favorites.filter(fav => fav !== movieTitle);
  } else {
    favorites.push(movieTitle);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites();
}

// Function to render favorites
function renderFavorites() {
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = '';
  favorites.forEach(favorite => {
    const favoriteItem = document.createElement('div');
    favoriteItem.classList.add('favorite-item');
    favoriteItem.textContent = favorite;
    favoritesList.appendChild(favoriteItem);
  });
  document.getElementById('favorites').style.display = favorites.length > 0 ? 'block' : 'none';
}

// Function to filter movies by category
function filterCategory(category) {
  renderMovies(category);
}

// Toggle light/dark mode
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const themeButton = document.getElementById('theme-toggle');
  themeButton.textContent = document.body.classList.contains('dark-mode') ? 'Dark Mode' : 'Light Mode';
});

// Initial render
renderMovies();
renderFavorites();
