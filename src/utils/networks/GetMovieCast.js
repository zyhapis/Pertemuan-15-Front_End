const API_KEY = '9337935dc90e9985d9607b7a37d641ae';

const GetMovieCast = async (movieId) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzY5MjAyYzZjOTgyODljMmJjMTUzZWZlZDUwOGZkYiIsInN1YiI6IjY0N2VjYTI5MGZiMzk4MDBjMTI5OGYxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tq9NNRwPItEUWugQ3uAVG-UvpJrcgeQvQEwWPmsyC6c',
      },
    };

    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`, options);
    if (!response.ok) {
      throw new Error('Failed to fetch cast data');
    }
    const data = await response.json();
    return data.cast;
  } catch (error) {
    console.error('Error fetching cast data:', error.message);
    return [];
  }
};

export default GetMovieCast;
