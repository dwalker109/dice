import { store } from "../../store";
import { initMatch, p1, p2, runMatch } from "./matchThunk";
import { Player } from "../../types";

beforeEach(async () => {
  store.dispatch({ type: "HARD_RESET" });
});

describe("Game loop execution", () => {
  it("Can init a new match", async () => {
    store.dispatch(initMatch());
    const match = store.getState().match;
    expect(match.players).toEqual<Player[]>([p1, p2]);
    expect(match.status).toMatch("NEW");
  });

  it("Can run a full match e2e", async () => {
    store.dispatch(initMatch());

    for (let i = 0; i < 100; i++) {
      store.dispatch(runMatch());
      const match = store.getState().match;
      expect(match.status).toMatch(/WON|DRAWN/);
      if (match.status === "WON") {
        expect(match.winner).toBeTruthy();
      }
      if (match.status === "DRAWN") {
        expect(match.winner).toBeFalsy();
      }
    }

    expect(store.getState().match.diceRoundIds.length).toEqual(100);
    expect(store.getState().dice.history.length).toEqual(100);
  });
});
