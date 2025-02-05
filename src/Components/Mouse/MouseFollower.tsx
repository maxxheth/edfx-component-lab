import { useState, useEffect, useRef } from "react";
import TextBlock from "./TextBlock";

const MouseFollower = () => {
	const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
	const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
	const mouseRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			mouseRef.current = { x: event.clientX, y: event.clientY };
		};

		window.addEventListener("mousemove", handleMouseMove);

		const followMouse = () => {
			const { x, y } = mouseRef.current;
			setBallPosition((prev) => ({
				x: prev.x + (x - prev.x) * 0.1,
				y: prev.y + (y - prev.y) * 0.1,
			}));
			setTextPosition((prev) => ({
				x: prev.x + (x - prev.x) * 0.05, // Slower speed for text block
				y: prev.y + (y - prev.y) * 0.05, // Slower speed for text block
			}));
			requestAnimationFrame(followMouse);
		};

		followMouse();

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<>
			<div
				style={{
					position: "fixed",
					zIndex: 100,
					width: 20,
					height: 20,
					backgroundColor: "red",
					borderRadius: "50%",
					pointerEvents: "none",
					transition: "transform 0.3s ease-out",
					transform: `translate(${ballPosition.x}px, ${ballPosition.y}px)`,
				}}
			/>
			<TextBlock position={textPosition} />
		</>
	);
};

export default MouseFollower;
