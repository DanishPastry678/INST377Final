const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const resultContainer = document.querySelector('#result-container');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = searchInput.value;
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=f164bc301c5a4c6dbde4e05c540e619c&query=${query}`);
  const data = await response.json();
  const movies = data.results;
  resultContainer.innerHTML = '';

  if (movies.length === 0) {
    resultContainer.innerHTML = '<p>No movies found.</p>';
  } else {
    movies.forEach((movie) => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      const posterUrl = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
      const title = movie.title;
      const overview = movie.overview;
      const rating = movie.vote_average;

      const movieContent = `
        <div class="movie-poster">
          <img src="${posterUrl}" alt="${title}">
        </div>
        <div class="movie-info">
          <h2 class="movie-title">${title}</h2>
          <p class="movie-overview">${overview}</p>
          <div class="movie-rating">
            <div class="movie-rating-bar">
              <div class="movie-rating-fill" style="width: ${rating * 10}%"></div>
            </div>
            <span class="movie-rating-text">${rating}</span>
          </div>
        </div>
      `;

      movieElement.innerHTML = movieContent;
      resultContainer.appendChild(movieElement);
    });
  }
});
