const jokeEndpoint = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious&type=twopart';

const getJoke = () => new Promise((resolve, reject) => {
  fetch(jokeEndpoint, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default getJoke;
