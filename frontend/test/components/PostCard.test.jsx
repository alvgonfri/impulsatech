import PostCard from "../../src/components/PostCard";
import { render, screen } from "@testing-library/react";

describe("PostCard", () => {
    it("should render the PostCard component correctly with an image", () => {
        const post = {
            _id: "1",
            content: "Test Post",
            image: {
                secure_url: "https://test.com/test.jpg",
            },
            createdAt: "2024-01-01T00:00:00.000Z",
        };

        render(<PostCard post={post} />);

        expect(screen.getByText("Test Post")).toBeDefined();
    });

    it("should render the PostCard component correctly without an image", () => {
        const post = {
            _id: "1",
            content: "Test Post",
            createdAt: "2024-01-01T00:00:00.000Z",
        };

        render(<PostCard post={post} />);

        expect(screen.getByText("Test Post")).toBeDefined();
    });
});
