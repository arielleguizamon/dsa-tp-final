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
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

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

const persistConfig = {
  key: "session",
  storage,
  blacklist: ["ui", "router"]
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);

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
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render(root, document.getElementById("root"));
// disable ServiceWorker
// registerServiceWorker();

// disable ServiceWorker
// registerServiceWorker();
