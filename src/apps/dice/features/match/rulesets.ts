import { Player, Ruleset, RulesetLookup } from "../../types";

const fallback: Ruleset = {
  name: "FALLBACK",
  minPlayers: 0,
  maxPlayers: 1,
  dicePerTurn: 0,
  rollAlgo: () => [0],
  winnerAlgo: () => null,
};

const standard: Ruleset = {
  name: "STANDARD",
  minPlayers: 2,
  maxPlayers: 2,
  dicePerTurn: 1,

  /**
   * Standard six sided die
   */
  rollAlgo() {
    return [Math.floor(Math.random() * 6) + 1];
  },

  /**
   * Highest die wins, draw nobody wins
   */
  winnerAlgo(round): Player | null {
    const sum = (dice: number[]): number =>
      dice.reduce((acc, cur) => acc + cur);

    try {
      const result = round.rolls.reduce((leader, current) => {
        const leaderSum = sum(leader.result);
        const currentSum = sum(current.result);

        if (leaderSum < currentSum) return current;
        if (leaderSum > currentSum) return leader;
        throw new Error("DRAW");
      });
      return result.player;
    } catch (e) {
      return null;
    }
  },
};

/**
 * Provide a lookup system to mitigate TS warnings from use of map.get()
 */
const lookup: RulesetLookup = new Map([["STANDARD", standard]]);

export default lookup;
export { fallback, standard };
