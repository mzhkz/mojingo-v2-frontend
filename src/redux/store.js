import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../redux/reducers'
import {createLogger} from "redux-logger";
import {DEBUG} from "../Constants";

const middleware = [];

if (DEBUG) {
    const logger = createLogger({
        diff: true,
        collapsed: true,
    });
    middleware.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store;