import React, { FC } from "react";
import { Player } from "../../types";
import { useSelector } from "react-redux";
import { selectActiveDiceRound } from "../dice/diceSelectors";
import { selectHistory } from "../match/matchSelectors";
import { Dice } from "../dice/Dice";

type ActorProps = { player: Player };
const Actor: FC<ActorProps> = ({ player }) => {
  const activeDiceRound = useSelector(selectActiveDiceRound);
  const history = useSelector(selectHistory);

  const { result } = activeDiceRound.rolls.find(it => {
    return it.player.id === player.id;
  }) || {
    result: [0],
  };
  const [, score] = history.find(([it]) => it === player.id) || [undefined, 0];

  return (
    <div className="Actor-main">
      <Dice results={result} />
      <div className="Actor-name">{player.name}</div>
      <div className="Actor-score">{score}</div>
    </div>
  );
};

export default Actor;
