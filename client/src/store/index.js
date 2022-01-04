
import { createStore, applyMiddleware, compose } from "redux";
import Reducer from "../redux/reducer"; 
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    Reducer, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;