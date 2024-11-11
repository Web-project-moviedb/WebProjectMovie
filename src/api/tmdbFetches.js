import dotenv from 'dotenv';
dotenv.config();

const fetchMoviesByName = async (name) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`;
    
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
      }
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      return data;

    } catch (err) {
      console.error('Error fetching movie data:', err);
      throw err;
    }
  };


const fetchMoviesByYear = async (year) => {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`;
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
      }
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      return data;

    } catch (err) {
      console.error('Error fetching movies:', err);
      throw err;
    }
  };
  
  
const fetchMovieById = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
      }
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      return data; 
      
    } catch (err) {
      console.error('Error fetching movie:', err);
      throw err;
    }
  };
  

export { fetchMoviesByName, fetchMoviesByYear, fetchMovieById };