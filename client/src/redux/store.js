import { createStore, applyMiddleware, compose } from "redux";

import logger from "redux-logger";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

import rootreducer from "./root-reducer";

const middlewares = [ReduxThunk, promiseMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(
  rootreducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

// eslint-disable-next-line import/no-anonymous-default-export
export default { store };
