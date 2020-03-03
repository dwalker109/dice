import { createSelector } from "@reduxjs/toolkit";
import { DiceState, RootState } from "./../../types";

const selectDice = (state: RootState): DiceState => state.dice;

const selectActiveDiceRound = createSelector(selectDice, state => state.active);

export { selectDice, selectActiveDiceRound };
