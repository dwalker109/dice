import React, { FC } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Match from "./features/match/Match";

const App: FC = () => <Match />;

const ReduxApp: FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxApp;
