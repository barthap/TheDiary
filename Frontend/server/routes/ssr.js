import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import reducers from '../../client/src/reducers/index';
import App from '../../client/src/App';
import {alertActions} from "../../client/src/actions/alert.actions";

const router = express.Router();

router.get('/', (req, res) => {
  /*
    http://redux.js.org/docs/recipes/ServerRendering.html
  */
  const store = createStore(reducers);

  /*
      We can dispatch actions from server side as well. This can be very useful if you want
      to inject some initial dataUrl into the app. For example, if you have some articles that
      you have fetched from database and you want to load immediately after the user has loaded
      the webpage, you can do so in here.

      This will help SEO as well. If you load the webpage and make a request to the server to get
      all the latest items/articles, by the time Google Search Engine may not see all the updated
      items/articles.

      But if you inject the latest items/articles before it reaches the user, the Search Engine
      will see the item/article immediately.
       */
//TODO: SSR dispatch
  store.dispatch(alertActions.info("Hello world from server!"));

  const context = {};

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.originalUrl}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>,
  );

  const finalState = store.getState();

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.status(200).render('../views/index.ejs', {
      html,
      script: JSON.stringify(finalState),
    });
  }
});


export default router;
