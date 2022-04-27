import React from "react";
import App from "./App";
import "./scss/main.scss";
import reduxStore from "./store/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>
);