import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import "./index.css";
import App from "./views/App";
import SessionModule from "./modules/session";
import { REDUCER_KEY as sessionReducerKey } from "./modules/session/constants";
import UIModule from "./modules/ui";
import { REDUCER_KEY as uiReducerKey } from "./modules/ui/constants";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import createHistory from "history/createBrowserHistory";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from "react-router-redux";

// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

const middleware = [];
middleware.push(thunk);
if (process.env.NODE_ENV === "development") {
  middleware.push(createLogger({}));
}

const history = createHistory();
middleware.push(routerMiddleware(history));

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const reducer = combineReducers({
  [sessionReducerKey]: SessionModule.reducer,
  [uiReducerKey]: UIModule.reducer,
  router: routerReducer
});

const store = createStore(reducer, enhancer);

/* 
if (process.env.NODE_ENV !== "production") {
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(reducer)
    })
  }
}
*/

const root = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(root, document.getElementById("root"));
// disable ServiceWorker
// registerServiceWorker();

// disable ServiceWorker
// registerServiceWorker();
