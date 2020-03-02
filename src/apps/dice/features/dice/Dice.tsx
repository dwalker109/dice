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
import PropTypes from "prop-types";
import React, { FC } from "react";

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
};

const Die: FC<DieProps> = ({ result }) => {
  const faIcon = faceMap.get(result) || faDiceD6;
  return (
    <div className="Die-main">
      <FontAwesomeIcon icon={faIcon} size="5x" />
    </div>
  );
};

Die.propTypes = {
  result: PropTypes.number.isRequired,
};

/**
 * Multiple
 */

type DiceProps = {
  results: number[];
};

const Dice: FC<DiceProps> = ({ results }) => (
  <>
    {results.map((result, i) => (
      <Die key={i} result={result} />
    ))}
  </>
);

Dice.propTypes = {
  results: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

/**
 * Export
 */

export { Die, Dice };
