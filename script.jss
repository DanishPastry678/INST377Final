const form = document.querySelector("#searchForm");
const search = document.querySelector("#searchInput");
const moviesContainer = document.querySelector("#moviesContainer");

const API_KEY = "f164bc301c5a4c6dbde4e05c540e619c";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchTerm = search.value;

  try {
    const results = await searchMovies(searchTerm);
    displayMovies(results);
  } catch (error) {
    console.error(error);
  }
});

async function searchMovies(searchTerm) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

function displayMovies(results) {
  let html = "";
  results.forEach((result) => {
    const { title, poster_path, overview } = result;
    html += `
      <div class="movie">
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <p>${overview}</p>
        </div>
      </div>
    `;
  });
  moviesContainer.innerHTML = html;
}
