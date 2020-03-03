import { v4 as uuid } from "uuid";
import { AppThunk, Player } from "../../types";
import { selectActiveDiceRound } from "../dice/diceSelectors";
import { roll, archive } from "../dice/diceSlice";
import { selectPlayers, selectRuleset } from "./matchSelectors";
import { draw, finish, init, start } from "./matchSlice";
import { fallback } from "./rulesets";

export const p1: Player = {
  id: uuid(),
  name: "You",
  cpu: false,
};

export const p2: Player = {
  id: uuid(),
  name: "Computer",
  cpu: true,
};

const initMatch = (): AppThunk => async (dispatch): Promise<void> => {
  // Init with players (hardcoded 2p as per spec)
  dispatch(init({ players: [p1, p2], ruleset: "STANDARD" }));
};

const runMatch = (): AppThunk => async (dispatch, getState): Promise<void> => {
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

  // Get the dice ready again
  dispatch(archive());
};

export { initMatch, runMatch };
