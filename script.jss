const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const resultContainer = document.querySelector('#result-container');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = searchInput.value;
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`);
  const data = await response.json();
  const movies = data.results;
  resultContainer.innerHTML = '';
  movies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.title}">
      <h2>${movie.title}</h2>
      <p>${movie.overview}</p>
    `;
    resultContainer.appendChild(movieElement);
  });
});
