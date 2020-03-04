import { fireEvent, render, wait } from "@testing-library/react";
import React from "react";
import App from "./App";

describe("App in use", () => {
  it("Can render the app", async () => {
    const component = render(<App />);
    expect(component.getByText("Let's Go!")).toBeTruthy();
  });

  it("Can run a round", async () => {
    const component = render(<App />);
    const button = component.getByRole("button");

    fireEvent.click(button);
    expect(component.getByTestId("result").textContent).toMatch("...");

    await wait(() => expect(button.getAttributeNode("disabled")).toBeFalsy());

    expect(component.getByTestId("result").textContent).toMatch(
      /it's a draw|you win|you lose/i
    );
  });
});
