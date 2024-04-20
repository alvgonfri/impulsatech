import Modal from "../../src/components/Modal";
import { render, screen } from "@testing-library/react";

describe("Modal", () => {
    it("should render the Modal component correctly", () => {
        const props = {
            title: "Test Modal",
            message: "Test content",
            onConfirm: function () {},
            onCancel: function () {},
        };

        render(<Modal {...props} />);

        expect(screen.getByText("Test Modal")).toBeDefined();
        expect(screen.getByText("Test content")).toBeDefined();
    });
});
