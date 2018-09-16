import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import AppWithState from './components/AppWithState';
import './style-base.css';

const root = document.getElementById('root');
const load = () => render(
  (
    <AppContainer>
      <BrowserRouter>
        <AppWithState />
      </BrowserRouter>
    </AppContainer>
  ), root,
);

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./components/AppWithState', load);
}

load();
