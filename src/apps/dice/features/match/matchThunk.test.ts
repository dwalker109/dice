import { store } from "../../store";
import { initMatch, runMatch } from "./matchThunk";
import { Player } from "../../types";
import { p1, p2 } from "../actor/players";

jest.mock("../../utils");
/* eslint-disable-next-line */
const { suspend } = require("../../utils");

beforeEach(async () => {
  store.dispatch({ type: "HARD_RESET" });
});

describe("Game loop execution", () => {
  it("Can init a new match", async () => {
    store.dispatch(initMatch([p1, p2]));
    const match = store.getState().match;
    expect(match.players).toEqual<Player[]>([p1, p2]);
    expect(match.status).toMatch("NEW");
  });

  it("Can run a full match e2e", async () => {
    store.dispatch(initMatch([p1, p2]));

    for (let i = 0; i < 100; i++) {
      // Need to ensure the internal suspend in (async) game loop resolves
      // before we check the match state, and just mocking suspend isn't enough
      let done;
      suspend.mockImplementationOnce(() => (done = Promise.resolve()));

      // See above - wait for the mocked suspend call to resolve
      // after running the match.
      store.dispatch(runMatch());
      await done;

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
