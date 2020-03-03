import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Actor from "../actor/Actor";
import { p1, p2 } from "../actor/players";
import { initMatch, runMatch } from "./matchThunk";

const Match: FC = () => {
  // Simple local state for players for life of component, for now
  const [player1] = useState(p1);
  const [player2] = useState(p2);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initMatch([player1, player2]));
  }, [dispatch, player1, player2]);

  return (
    <div className="Match-main">
      <div className="Match-p1">
        <Actor player={player1} />
      </div>
      <div className="Match-p2">
        <Actor player={player2} />
      </div>
      <div className="Match-go">
        <button onClick={() => dispatch(runMatch())}>Go</button>
      </div>
    </div>
  );
};

export default Match;
