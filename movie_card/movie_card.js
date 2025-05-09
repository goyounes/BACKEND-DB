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

    const scriptElement = document.createElement('script');
    scriptElement.textContent = script;
    shadow.appendChild(scriptElement);

    shadow.prepend(style); // Ensure styles apply before content is rendered

  }
}

customElements.define('my-component', MyComponent);



