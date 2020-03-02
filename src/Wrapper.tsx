import React, { FC } from "react";
import DiceApp from "./apps/dice/App";

const Wrapper: FC = () => (
  <>
    <DiceApp />
    {/* Theoretically, many discreate apps here */}
  </>
);

export default Wrapper;
