import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { MatchState, Player } from "../../types";
import { DiceRound, SupportedRulesets } from "./../../types";

const initialState: MatchState = {
  id: uuid(),
  status: "NEW",
  diceRoundIds: [],
  players: [],
  winner: null,
  history: [],
  ruleset: "STANDARD",
};

const matchSlice = createSlice({
  initialState,
  name: "match",
  reducers: {
    init(
      state,
      action: PayloadAction<{ players: Player[]; ruleset: SupportedRulesets }>
    ): void {
      state.players = action.payload.players;
      state.ruleset = action.payload.ruleset;
    },
    start(state): void {
      state.winner = null;
      state.status = "RUNNING";
    },
    finish(
      state,
      action: PayloadAction<{ diceRound: DiceRound; winner: Player }>
    ): void {
      const { diceRound, winner } = action.payload;

      state.status = "WON";
      state.winner = winner;

      // Tuple -> Map -> Tuple conversion b/c cannot serialise a Map, but Map lookups are +1
      const historyMap = new Map<Player, number>(state.history);
      const playerWins = historyMap.get(winner) || 0;
      historyMap.set(winner, playerWins + 1);
      state.history = Array.from(historyMap);

      state.diceRoundIds.push(diceRound.id);
    },
    draw(state, action: PayloadAction<{ diceRound: DiceRound }>): void {
      const { diceRound } = action.payload;

      state.status = "DRAWN";
      state.diceRoundIds.push(diceRound.id);
    },
  },
  extraReducers: {
    HARD_RESET(): MatchState {
      return initialState;
    },
  },
});

export const { init, start, finish, draw } = matchSlice.actions;
export default matchSlice.reducer;
