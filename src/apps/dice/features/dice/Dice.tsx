import {
  faDiceD6,
  faDiceFive,
  faDiceFour,
  faDiceOne,
  faDiceSix,
  faDiceThree,
  faDiceTwo,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { MatchStatus } from "../../types";
import "./Dice.css";

/**
 * Single
 */

const faceMap: Map<number, IconDefinition> = new Map([
  [1, faDiceOne],
  [2, faDiceTwo],
  [3, faDiceThree],
  [4, faDiceFour],
  [5, faDiceFive],
  [6, faDiceSix],
]);

type DieProps = {
  result: number;
  status: MatchStatus;
};

const Die: FC<DieProps> = ({ result, status }) => {
  const faIcon = faceMap.get(result) || faDiceD6;
  return (
    <div className="Die-main">
      <FontAwesomeIcon
        icon={faIcon}
        size="5x"
        className={status === "RUNNING" ? "wobble" : undefined}
      />
    </div>
  );
};

/**
 * Multiple
 */

type DiceProps = {
  results: number[];
  status: MatchStatus;
};

const Dice: FC<DiceProps> = ({ results, status }) => (
  <>
    {results.map((result, i) => (
      <Die key={i} result={result} status={status} />
    ))}
  </>
);

/**
 * Export
 */

export { Die, Dice };
