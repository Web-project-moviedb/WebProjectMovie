// note: these are all set to be sorted by tmdb vote count (descending) bc that gives the most relevant results 
// to change sorting to tmdb popularity (don't ask me what it's based on, I have no idea bc the results are v weird), change the sort_by value to 'popularity.desc'
// to change sorting to revenue (note that this does not take inflation into account), change the sort_by value to 'revenue.desc'

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
    return data;

  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
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
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1&sort_by=vote_count.desc`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
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
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&primary_release_year=${year}`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data; 

  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
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
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_original_language=${lang}`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
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
    return data;

  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
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
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=${genre}`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}


export { fetchMovieById, fetchMoviesByTerm, fetchMoviesByYear, fetchMoviesByLanguage, fetchMoviesByGenre, fetchGenres }