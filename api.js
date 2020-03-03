const api_key = "d81b376baa1c52b6b2d2a7619082cd38";
const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`;

// id, poster_path, backdrop_path,title, overview
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
    return movies;
  } catch (error) {
    console.log(error);
  }
}

const movies = getMovies().then(movies => console.log(movies));
// movies.then(result => console.log(result));
