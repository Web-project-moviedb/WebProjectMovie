const fetchMovieById = async (id) => {

  const api_token = process.env.REACT_APP_API_TOKEN;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: api_token
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US', options`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;  // Return the fetched data
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;  // Rethrow error to handle it in the component
  }
}

const fetchMoviesByTerm = async (term) => {
  const api_token = process.env.REACT_APP_API_TOKEN;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: api_token
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;  // Return the fetched data
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;  // Rethrow error to handle it in the component
  }
}

const fetchMoviesByYear = async (year) => {
  const api_token = process.env.REACT_APP_API_TOKEN;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: api_token
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&primary_release_year=${year}`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;  // Return the fetched data
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;  // Rethrow error to handle it in the component
  }
};

const fetchMoviesByLanguage = async (lang) => {
  const api_token = process.env.REACT_APP_API_TOKEN;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: api_token
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_original_language=${lang}`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;  // Return the fetched data
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;  // Rethrow error to handle it in the component
  }
};

const fetchGenres = async () => {

  const api_token = process.env.REACT_APP_API_TOKEN;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: api_token
    }
  };

  try {
    const response = await fetch(`  https://api.themoviedb.org/3/genre/movie/list?language=en`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;  // Return the fetched data
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;  // Rethrow error to handle it in the component
  }

}

const fetchMoviesByGenre = async (genre) => {
  const api_token = process.env.REACT_APP_API_TOKEN;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: api_token
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;  // Return the fetched data
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;  // Rethrow error to handle it in the component
  }
}


export { fetchMovieById, fetchMoviesByTerm, fetchMoviesByYear, fetchMoviesByLanguage, fetchMoviesByGenre, fetchGenres }