async function loadMovies() {
    console.log("here")
  try {
    const response = await fetch('http://127.0.0.1:3000/database/movies',{
        method:"GET",
        mode:"cors"
    }); 
    const movies = await response.json();

    const tbody = document.getElementById('movies-body');
    tbody.innerHTML = ''; // clear any existing rows

    movies.forEach(movie => {
      const row = document.createElement('tr');
      if (movie.is_team_pick) {
        row.classList.add('highlight');
      }

      row.innerHTML = `
        <td>${movie.title}</td>
        <td>${movie.description}</td>
        <td>${movie.age_rating}+</td>
        <td>${movie.is_team_pick ? 'Yes' : 'No'}</td>
        <td>${movie.score}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Failed to fetch movies:', err);
  }
}

loadMovies();