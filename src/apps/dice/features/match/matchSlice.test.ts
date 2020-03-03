import { v4 as uuid } from "uuid";
import { store } from "../../store";
import { Player } from "../../types";
import { DiceRound } from "./../../types";
import { draw, finish, init, start } from "./matchSlice";
import rulesets from "./rulesets";

const player1: Player = {
  id: uuid(),
  name: "Mock Player 1",
  cpu: false,
};

const player2: Player = {
  id: uuid(),
  name: "Mock Player 2",
  cpu: false,
};

const winnerAlgo = rulesets.get("STANDARD")?.winnerAlgo as (
  diceRound: DiceRound
) => Player;

beforeEach(async () => {
  store.dispatch({ type: "HARD_RESET" });
});

describe("Match events", () => {
  it("Can init a new match", async () => {
    store.dispatch(init({ players: [player1, player2], ruleset: "STANDARD" }));
    expect(store.getState().match.players).toEqual<Player[]>([
      player1,
      player2,
    ]);
  });

  it("Can start a match", async () => {
    store.dispatch(start());
    expect(store.getState().match.status).toMatch("RUNNING");
  });

  it("Can finish a match with win", async () => {
    store.dispatch(init({ players: [player1, player2], ruleset: "STANDARD" }));
    store.dispatch(start());

    const diceRound: DiceRound = {
      id: "mocked",
      rolls: [
        { player: player1, result: [1] },
        { player: player2, result: [6] },
      ],
    };

    store.dispatch(finish({ diceRound, winner: winnerAlgo(diceRound) }));
    expect(store.getState().match.status).toMatch("WON");
    expect(store.getState().match.winner).toBe(player2);
  });

  it("Can finish a match with draw", async () => {
    store.dispatch(init({ players: [player1, player2], ruleset: "STANDARD" }));
    store.dispatch(start());

    const diceRound: DiceRound = {
      id: "mocked",
      rolls: [
        { player: player1, result: [3] },
        { player: player2, result: [3] },
      ],
    };

    store.dispatch(draw({ diceRound }));
    expect(store.getState().match.status).toMatch("DRAWN");
    expect(store.getState().match.winner).toBe(null);
  });
});
