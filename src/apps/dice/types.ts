export type Player = {
  id: string;
  name: string;
  cpu: boolean;
};

export type DiceRoll = {
  player: Player;
  result: number[];
};

export type Round = {
  id: string;
  rolls: DiceRoll[];
};

export type DiceState = {
  active: Round;
  history: Round[];
};
