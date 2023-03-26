import './activity.scss';
import onChange from '../../../node_modules/on-change';

const URL = 'http://www.boredapi.com/api/activity/'; // 'https://www.boredapi.com/';
/*
const fetchActivity = (state, url) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        state.errors.push(response.statusText);
        state.botState.happy = false;
        state.ideaContent = response.statusText;
        return;
      }
      // console.log(response);
      return response.json();
    })
    .then((payload) => {
      state.botState.happy = true;
      state.ideaContent = payload.activity;
    })
    .catch((e) => {
      state.errors.push(e.message);
      state.botState.happy = false;
      state.ideaContent = e.message;
    })
};
*/

const renderTitle = (container, isBotHappy) => {
  const titleContent = document.createElement('span');
  titleContent.classList.add('title__text');

  if (isBotHappy) {
    titleContent.classList.add('title__text--happy');
    titleContent.textContent = 'HappyBot';
  } else {
    titleContent.classList.remove('title__text--happy');
    titleContent.textContent = 'BoredBot';
  }

  container.appendChild(titleContent);
};

const renderPage = (pageBody, isBotHappy) => {
  if (isBotHappy) {
    pageBody.classList.add('fun');
  }
  if (!isBotHappy) {
    pageBody.classList.remove('fun');
  }
};

const app = () => {
  const state = {
    ideaContent: '',
    loadStatus: null,
    errors: [],
    botState: {
      happy: false,
    },
  };

  const pageBody = document.body;
  const title = document.querySelector('#title');
  const questionBtn = document.querySelector('#question');
  const idea = document.querySelector('#idea');

  const watchedState = onChange(state, (path, current) => {
    if (path === 'botState.happy') {
      title.innerHTML = '';
      renderTitle(title, current);
      renderPage(pageBody, current);
    }
    if (path === 'ideaContent') {
      idea.textContent = current;
    }
  });

  questionBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          watchedState.errors.push(response.statusText);
          watchedState.botState.happy = false;
          watchedState.ideaContent = response.statusText;
          return null;
        }
        // console.log(response);
        return response.json();
      })
      .then((payload) => {
        watchedState.botState.happy = true;
        watchedState.ideaContent = payload.activity;
      })
      .catch((e) => {
        watchedState.errors.push(e.message);
        watchedState.botState.happy = false;
        watchedState.ideaContent = e.message;
      });
  });
};

export default app;
