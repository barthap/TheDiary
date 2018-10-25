import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import reducers from './reducers/index';
import App from './App';
import { routerHistory } from './helpers/history';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./saga";

/*
Here we are getting the initial state injected by the server. See routes/index.js for more details
 */
const initialState = window.__INITIAL_STATE__; // eslint-disable-line


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducers,
    initialState,
    applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

/*
While creating a store, we will inject the initial state we received from the server to our app.
 */
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={routerHistory}>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('reactbody'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line
    const nextApp = require('./App').default;
    render(nextApp);
  });
}

// module.hot.accept('./reducers', () => {
//   // eslint-disable-next-line
//   const nextRootReducer = require('./reducers/index');
//   store.replaceReducer(nextRootReducer);
// });
