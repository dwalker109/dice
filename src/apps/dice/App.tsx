import { configureStore } from "@reduxjs/toolkit";
import React, { FC } from "react";
import { Provider } from "react-redux";
import appReducer from "./appReducer";

const store = configureStore({ reducer: appReducer });

const App: FC = () => null;

const ReduxApp: FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxApp;
