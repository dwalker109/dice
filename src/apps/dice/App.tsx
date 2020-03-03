import React, { FC } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const App: FC = () => null;

const ReduxApp: FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxApp;
