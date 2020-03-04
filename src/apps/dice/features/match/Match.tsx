import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Actor from "../actor/Actor";
import { p1, p2 } from "../actor/players";
import { initMatch, runMatch } from "./matchThunk";
import { selectStatus, selectWinner } from "./matchSelectors";
import { PayloadAction } from "@reduxjs/toolkit";

const Match: FC = () => {
  // Simple local state for players for life of component, for now
  const [player1] = useState(p1);
  const [player2] = useState(p2);

  const winner = useSelector(selectWinner);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initMatch([player1, player2]));
  }, [dispatch, player1, player2]);

  const resultStyle = {
    opacity: status === "RUNNING" ? 0 : 1,
  };

  return (
    <div className="Match-main">
      <div className="Match-p1">
        <Actor player={player1} />
      </div>
      <div className="Match-p2">
        <Actor player={player2} />
      </div>
      <div className="Match-result" style={resultStyle}>
        {status === "RUNNING" && <>...</>}
        {status === "NEW" && <>Let&apos;s Go!</>}
        {status === "WON" && winner === player1 && <>You Win!</>}
        {status === "WON" && winner === player2 && <>You Lose!</>}
        {status === "DRAWN" && winner === null && <>It&apos; a Draw!!</>}
      </div>
      <div className="Match-go">
        <button
          disabled={status === "RUNNING"}
          onClick={(): any => dispatch(runMatch())}
        >
          Roll Dice
        </button>
      </div>
    </div>
  );
};

export default Match;
