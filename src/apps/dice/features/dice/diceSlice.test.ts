import { v4 as uuid } from "uuid";
import { store } from "../../store";
import { Player } from "../../types";
import { archive, roll } from "./diceSlice";
import rulesets from "../match/rulesets";

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

const rollAlgo = rulesets.get("STANDARD")?.rollAlgo as () => number[];

beforeEach(async () => {
  store.dispatch({ type: "HARD_RESET" });
});

describe("Die throws", () => {
  it("Can roll for a player", async () => {
    expect(store.getState().dice.active.rolls.length).toEqual(0);
    store.dispatch(roll({ player: player1, result: rollAlgo() }));
    expect(store.getState().dice.active.rolls.length).toBe(1);
  });

  it("Can roll for multiple players", async () => {
    expect(store.getState().dice.active.rolls.length).toEqual(0);
    store.dispatch(roll({ player: player1, result: rollAlgo() }));
    store.dispatch(roll({ player: player2, result: rollAlgo() }));
    expect(store.getState().dice.active.rolls.length).toBe(2);
  });

  it("Will not allow multiple rolls for the same player each round", async () => {
    expect(store.getState().dice.active.rolls.length).toEqual(0);
    store.dispatch(roll({ player: player1, result: rollAlgo() }));
    store.dispatch(roll({ player: player1, result: rollAlgo() }));
    expect(store.getState().dice.active.rolls.length).toBe(1);
  });

  it("Can move a round to history", async () => {
    expect(store.getState().dice.history.length).toBe(0);
    store.dispatch(roll({ player: player1, result: rollAlgo() }));
    store.dispatch(archive());
    expect(store.getState().dice.active.rolls.length).toBe(0);
    expect(store.getState().dice.history.length).toBe(1);
    expect(
      store.getState().dice.active.id === store.getState().dice.history[0].id
    ).toBeFalsy();
  });
});
