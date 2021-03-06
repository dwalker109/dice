import { appReducer } from "./store";
import { ThunkAction, Action } from "@reduxjs/toolkit";

export type Player = {
  id: string;
  name: string;
  cpu: boolean;
};

export type DiceRoll = {
  player: Player;
  result: number[];
};

export type DiceRound = {
  id: string;
  rolls: DiceRoll[];
};

export type DiceState = {
  active: DiceRound;
  history: DiceRound[];
};

export type SupportedRulesets = "STANDARD" | "FALLBACK";

export interface Ruleset {
  name: SupportedRulesets;
  minPlayers: number;
  maxPlayers: number;
  dicePerTurn: number;
  rollAlgo: () => number[];
  winnerAlgo: (round: DiceRound) => Player | null;
}

export type RulesetLookup = Map<SupportedRulesets, Ruleset>;

export type MatchHistory = [string, number];

export type MatchStatus = "NEW" | "RUNNING" | "WON" | "DRAWN";

export type MatchState = {
  id: string;
  status: MatchStatus;
  diceRoundIds: string[];
  players: Player[];
  winner: Player | null;
  history: MatchHistory[];
  ruleset: SupportedRulesets;
};

export type RootState = ReturnType<typeof appReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
