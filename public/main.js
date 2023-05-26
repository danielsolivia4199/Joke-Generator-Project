// USE WITH FIREBASE AUTH
import ViewDirectorBasedOnUserAuthStatus from '../utils/viewDirector';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';
import getJoke from '../api/joke';

const renderToDom = (divId, content) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = content;
};

const init = () => {
  const buttonString = `
  <h1>Joke Generator!</h1>
  <div id= "joke-container"></div>
  <div id= "joke">
  <button class="btn btn-dark" id="joke-btn">Get A Joke</button>
   </div>
  `;
  renderToDom('#app', buttonString);

  const buttonSetup = (btnText, btnId) => {
    const domString = `<button class ="btn btn-dark" id="${btnId}">${btnText}</button>`;
    renderToDom('#joke', domString);
  };

  let joke = {}; // state

  const jokeSetup = (obj) => {
    joke = {
      setup: obj.setup,
      punchline: obj.delivery
    };

    return joke;
  };

  document.querySelector('#joke').addEventListener('click', (e) => {
    if (e.target.id === 'joke-btn') {
      getJoke().then((response) => {
        jokeSetup(response);

        // Rerender the DOM with the Joke setup and new button
        document.querySelector('#joke-container').innerHTML = `<p>${joke.setup}</p>`;
        buttonSetup('Get Punchline', 'punchline-btn');
      });
    }

    if (e.target.id === 'punchline-btn') {
      const jokeContainer = document.querySelector('#joke-container');
      jokeContainer.innerHTML += `<p>${joke.punchline}</p>`;
      buttonSetup('Get Another Joke', 'joke-btn');
    }
  });
};
ViewDirectorBasedOnUserAuthStatus();
init();
