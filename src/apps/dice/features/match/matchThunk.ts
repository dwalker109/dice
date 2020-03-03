import { AppThunk, Player } from "../../types";
import { selectActiveDiceRound } from "../dice/diceSelectors";
import { archive, roll } from "../dice/diceSlice";
import { selectPlayers, selectRuleset } from "./matchSelectors";
import { draw, finish, init, start } from "./matchSlice";
import { fallback } from "./rulesets";

const initMatch = (players: Player[]): AppThunk => async (
  dispatch
): Promise<void> => {
  // Init with players
  dispatch(init({ players: players, ruleset: "STANDARD" }));
};

const runMatch = (): AppThunk => async (dispatch, getState): Promise<void> => {
  // Get the dice ready
  dispatch(archive());

  // Start a new game
  dispatch(start());

  // Get algorithms from ruleset
  const { rollAlgo, winnerAlgo } = selectRuleset(getState()) || fallback;

  // Throw dice for all players
  const players = selectPlayers(getState());
  players.forEach(player => dispatch(roll({ player, result: rollAlgo() })));

  // Finish the game and calc outcomes
  const diceRound = selectActiveDiceRound(getState());
  const winner = winnerAlgo(diceRound);
  if (winner) {
    dispatch(finish({ diceRound, winner }));
  } else {
    dispatch(draw({ diceRound }));
  }
};

export { initMatch, runMatch };
