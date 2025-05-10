// class MyComponent extends HTMLElement {
//     async connectedCallback() {
//       const response = await fetch('./movie_card/movie_card.html');
//       const html = await response.text();
//       this.innerHTML = html;
//     }
// }
     


class MyComponent extends HTMLElement {
  async connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const [html, css, script] = await Promise.all([
      fetch('./movie_card/movie_card.html').then(res => res.text()),
      fetch('./movie_card/movie_card.css').then(res => res.text()),
      fetch('./movie_card/script.js').then(res => res.text())
    ]);

    const style = document.createElement('style');
    style.textContent = css;

    shadow.innerHTML = html;

    // const scriptElement = document.createElement('script');
    // scriptElement.textContent = script;
    // shadow.appendChild(scriptElement);

    shadow.prepend(style); // Ensure styles apply before content is rendered

    (async function(shadowRoot) {
      // Your original script.js code goes here
      // Use shadowRoot.querySelector(...) to access elements in shadow DOM
      console.log('Movie card script running');
      const title = shadowRoot.querySelector('.title');
      if (title) title.style.color = 'red';

      console.log("Additional function is about to start")
            try {
              const response = await fetch('http://127.0.0.1:3000/database/movies',{
                  method:"GET",
                  mode:"cors"
              }); 
              const movies = await response.json();

              const tbody = shadowRoot.getElementById('movies-body');
              tbody.innerHTML = ''; // clear any existing rows

              movies.forEach(movie => {
                const row = shadowRoot.createElement('tr');
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

    })(shadow);

  }
}


customElements.define('my-component', MyComponent);



