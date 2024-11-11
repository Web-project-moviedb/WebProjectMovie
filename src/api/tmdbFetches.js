const fetchMovieById = async (id) => {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=47c84eb927bbf4c15c9c2e0f740851ea`)
      const data = await response.json()
      return data  // Return the movie data
  } catch (error) {
      console.error('Error fetching movie:', error)
      throw error  // Throw error to handle it in the component
  }
}

export { fetchMovieById }