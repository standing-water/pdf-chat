import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import rootReducer from "reducers/rootReducer";
import rootSaga from "sagas/rootSaga";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
