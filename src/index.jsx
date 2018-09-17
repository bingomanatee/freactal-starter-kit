import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import './style-base.css';

const root = document.getElementById('root');
const load = () => render(
  (
    <AppContainer>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </AppContainer>
  ), root,
);

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./components/App', load);
}

load();
