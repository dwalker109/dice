import { combineReducers } from "@reduxjs/toolkit";
import diceReducer from "./features/dice/diceSlice";

export default combineReducers({ dice: diceReducer });
