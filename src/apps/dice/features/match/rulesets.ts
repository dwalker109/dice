import { Ruleset, RulesetLookup, Player, DiceRoll } from "../../types";

const standard: Ruleset = {
  name: "STANDARD",
  minPlayers: 2,
  maxPlayers: 2,
  dicePerTurn: 1,
  rollAlgo() {
    return [Math.floor(Math.random() * 6) + 1];
  },
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

const lookup: RulesetLookup = new Map([["STANDARD", standard]]);

export default lookup;
