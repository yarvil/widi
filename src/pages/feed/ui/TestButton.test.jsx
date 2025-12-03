import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TestButton from "./TestButton";

describe("TestButton sanity test", () => {
  it("renders button", () => {
    render(<TestButton />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
