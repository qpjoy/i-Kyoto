import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
// import store from "./store";

import "./assets/css/global.css";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./configureStore";

// // Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
// let container = document.createElement("div");

// container.id = "root";
// document.body.appendChild(container);
const { persistor, store } = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// // Now we can render our application into it
// render(<App />, document.getElementById('root'))
