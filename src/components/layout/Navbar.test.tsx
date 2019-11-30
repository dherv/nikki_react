import React from "react";
import Navbar from "./Navbar";
import { render, wait } from "@testing-library/react";

describe("Navbar component", () => {
  test("should display one Nikki title", () => {
    expect.assertions(1);
    const { getByText } = render(<Navbar />);
    expect(getByText("Nikki 日記")).toBeDefined();
  });
  test("should display 4 links", () => {
    expect.assertions(5);
    const { getByText, getAllByRole } = render(<Navbar />);
    expect(getAllByRole("link")).toHaveLength(4);
    expect(getByText("Dailies")).toBeDefined();
    expect(getByText("Editor")).toBeDefined();
    expect(getByText("Words")).toBeDefined();
    expect(getByText("Grammars")).toBeDefined();
  });
});
