import AccordionItem from "../../src/components/AccordionItem";
import { render, screen } from "@testing-library/react";

describe("AccordionItem", () => {
    it("should render the AccordionItem component correctly", () => {
        render(<AccordionItem header="Test Accordion" text="Test" />);

        expect(screen.getByText("Test Accordion")).toBeDefined();
        expect(screen.getByText("Test")).toBeDefined();
    });
});
