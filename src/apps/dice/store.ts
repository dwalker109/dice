import { combineReducers, configureStore } from "@reduxjs/toolkit";
import diceReducer from "./features/dice/diceSlice";
import matchReducer from "./features/match/matchSlice";

const appReducer = combineReducers({
  dice: diceReducer,
  match: matchReducer,
});

const store = configureStore({
  reducer: appReducer,
});

export { appReducer, store };
