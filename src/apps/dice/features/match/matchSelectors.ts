import { createSelector } from "@reduxjs/toolkit";
import { MatchState, RootState } from "./../../types";
import rulesets from "./rulesets";

const selectMatch = (state: RootState): MatchState => state.match;

const selectStatus = createSelector(selectMatch, state => state.status);
const selectPlayers = createSelector(selectMatch, state => state.players);
const selectRuleset = createSelector(selectMatch, state =>
  rulesets.get(state.ruleset)
);
const selectWinner = createSelector(selectMatch, state => state.winner);
const selectHistory = createSelector(selectMatch, state => state.history);

export {
  selectMatch,
  selectStatus,
  selectPlayers,
  selectRuleset,
  selectWinner,
  selectHistory,
};
