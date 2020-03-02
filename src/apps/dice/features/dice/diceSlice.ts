import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { DiceState, Player } from "../../types";

const initialState: DiceState = {
  active: { id: uuid(), rolls: [] },
  history: [],
};

const diceAlgo = (): number => Math.floor(Math.random() * 6) + 1;

const diceSlice = createSlice({
  initialState,
  name: "dice",
  reducers: {
    roll(state, action: PayloadAction<Player>): DiceState {
      if (
        !state.active.rolls.some(roll => roll.player.id === action.payload.id)
      ) {
        state.active.rolls.push({
          player: action.payload,
          result: [diceAlgo()],
        });
      }
      return state;
    },
    archive(state): DiceState {
      return {
        active: { id: uuid(), rolls: [] },
        history: [...state.history, state.active],
      };
    },
  },
  extraReducers: {
    HARD_RESET(): DiceState {
      return initialState;
    },
  },
});

export const { roll, archive } = diceSlice.actions;
export default diceSlice.reducer;
