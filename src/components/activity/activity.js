import './activity.scss';
import onChange from '../../../node_modules/on-change';

const URL =  'http://www.boredapi.com/api/activity/'; // 'https://www.boredapi.com/';

const questionBtnHandler = () => {

};

const fetchActivity = (url) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        watchedState.errors.push(response.statusText);
        watchedState.botState.happy = false;
        watchedState.ideaContent = response.statusText;
        return;
      }
      return response.json()}
    )
    .then((payload) => {
      watchedState.botState.happy = true;
      watchedState.ideaContent = payload.activity;
    })
    .catch((e) => {
      watchedState.errors.push(e.message);
      watchedState.botState.happy = false;
      watchedState.ideaContent = e.messages;
    })
}; 

const renderTitle = (container, isBotHappy) => {
  // 
  const titleContent = document.createElement('span');
  titleContent.classList.add('title__text');
  
  if (isBotHappy) {
    titleContent.classList.add('title__text--happy');
    titleContent.textContent = 'HappyBot';
    // container.innerHTML = titleContent.textContent;
  } else {
    titleContent.classList.remove('title__text--happy');
    titleContent.textContent = 'BoredBot';
    // container.innerHTML = titleContent.textContent;
  }
  container.innerHTML = '';
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
  // const ideaBox = document.querySelector('#idea-box');
  const title = document.querySelector('#title');
  const questionBtn = document.querySelector('#question');
  const idea = document.querySelector('#idea')

  const watchedState = onChange(state, (path, current, previous) => {
    if (path === 'botState.happy') {
      renderTitle(title, current);
      renderPage(pageBody, current);
    }
    if (path === 'ideaContent') {
      idea.textContent = current;
    }
  });

  questionBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    fetch(URL)
    .then((response) => {
      if (!response.ok) {
        watchedState.errors.push(response.statusText);
        watchedState.botState.happy = false;
        watchedState.ideaContent = response.statusText;
        return;
      }
      console.log(response);
      return response.json()}
    )
    .then((payload) => {
      watchedState.botState.happy = true;
      watchedState.ideaContent = payload.activity;
    })
    .catch((e) => {
      watchedState.errors.push(e.message);
      watchedState.botState.happy = false;
      watchedState.ideaContent = e.message;
    })
  });
};

export default app;

