import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import axios from "axios";
import dotenv from "dotenv";
import { MoralisProvider } from "react-moralis";

const { REACT_APP_MORALIS_APPLICATION_ID, REACT_APP_MORALIS_SERVER_URL } =
  process.env;
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MoralisProvider
        appId={REACT_APP_MORALIS_APPLICATION_ID}
        serverUrl={REACT_APP_MORALIS_SERVER_URL}
      >
        <App />
      </MoralisProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
