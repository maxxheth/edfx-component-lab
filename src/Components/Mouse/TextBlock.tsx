import React from "react";
import { useAtom } from "jotai";
import { colorAtom } from "../../atoms";

interface TextBlockProps {
    position: { x: number; y: number };
	lag?: number;
}

const TextBlock: React.FC<TextBlockProps> = ({ position, lag = 0 }) => {

	const [color] = useAtom(colorAtom);

    return (
        <div
            style={{
                position: "fixed",
                zIndex: 100,
                width: "auto",
                // height: 50,
                // backgroundColor: "lightblue",
                // borderRadius: 10,
                pointerEvents: "none",
                transition: "transform 2s ease-out",
				transformOrigin: "center top",
                transform: `translate(${position.x - lag}px, ${position.y - lag}px)`,
            }}
        >
            <h2 style={{ fontSize: "10rem", color, textAlign: "center" }}>Follow Me!</h2>
        </div>
    );
};

export default TextBlock;