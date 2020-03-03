(function() {
  const api_key = "your api key";
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`;
  const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/w780";

  async function getMovies() {
    try {
      const result = await fetch(url);
      const data = await result.json();
      const movies = await data.results.map(item => ({
        id: item.id,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        title: item.title,
        overview: item.overview
      }));
      console.log(movies);
      return movies;
    } catch (error) {
      console.log(error);
    }
  }
  // const movies =
  getMovies().then(movies => {
    let counter = 0;
    let size = movies.length - 1;
    console.log(size);
    // get image container
    const imageContainer = document.querySelector(".img-container");

    // get next and back buttons
    const buttons = document.querySelectorAll(".btn");

    // handle previous / next navigation
    function handlenavigation(event) {
      let control = event.target;
      // check if it the previous button
      if (control.classList.contains("btn-left")) {
        // decrement counter by 1
        counter--;
        // check counter < 0 == movies array length
        if (counter < 0) {
          counter = size;
        }
        // set the background image
        imageContainer.style.backgroundImage = `url('${IMAGE_BASE_URL}${movies[counter].poster_path}')`;
      }
      if (control.classList.contains("btn-right")) {
        // increment counter by 1
        counter++;
        // check counter > movies array length
        if (counter > size) {
          counter = 0;
        }
        // set the background image
        imageContainer.style.backgroundImage = `url('${IMAGE_BASE_URL}${movies[counter].poster_path}')`;
      }
    }

    buttons.forEach(btn => {
      btn.addEventListener("click", handlenavigation);
    });
  });
})();
