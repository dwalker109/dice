import { render } from "@testing-library/react";
import React from "react";
import { Dice, Die } from "./Dice";

describe("Die/Dice rendering", () => {
  it("Should render a single die", async () => {
    const component = render(<Die result={1} />);
    expect(component.getByRole("img", { hidden: true })).toHaveClass(
      "fa-dice-one"
    );
  });

  it("Should render a multiple dice", async () => {
    const component = render(<Dice results={[1, 2, 3, 4, 5, 6]} />);
    const [d1, d2, d3, d4, d5, d6] = component.getAllByRole("img", {
      hidden: true,
    });
    expect(d1).toHaveClass("fa-dice-one");
    expect(d2).toHaveClass("fa-dice-two");
    expect(d3).toHaveClass("fa-dice-three");
    expect(d4).toHaveClass("fa-dice-four");
    expect(d5).toHaveClass("fa-dice-five");
    expect(d6).toHaveClass("fa-dice-six");
  });
});
