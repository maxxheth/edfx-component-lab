import { useEffect, useRef } from "react";
import Matter from "matter-js";

type DotsGridProps = {
	gridWidth?: number;
	gridHeight?: number;
	spacing?: number;
	dotRadius?: number;
	calcWidthByParent?: boolean;
	calcWidthByParentOffset?: number;
};

const DotsGrid: React.FC<DotsGridProps> = ({
	gridWidth = 100,
	gridHeight = 50,
	spacing = 50,
	dotRadius = 5,
	calcWidthByParent = false,
	calcWidthByParentOffset = 0,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Calculate grid dimensions based on container size if calcWidthByParent is true
		const effectiveGridWidth = calcWidthByParent
			? Math.floor((container.clientWidth - calcWidthByParentOffset) / spacing)
			: gridWidth;

		// Module aliases
		const Engine = Matter.Engine;
		const Runner = Matter.Runner;
		const Bodies = Matter.Bodies;
		const Mouse = Matter.Mouse;
		const MouseConstraint = Matter.MouseConstraint;
		const World = Matter.World;

		// Create an engine
		const engine = Engine.create();
		const world = engine.world;

		// Get the canvas and context
		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext("2d");
		if (!context) return;

		// Extend the Matter.Body interface with a size property
		type BodyWithSize = Matter.Body & { size: number };

		const dots: BodyWithSize[] = [];
		const totalDots = effectiveGridWidth * gridHeight;

		for (let index = 0; index < totalDots; index++) {
			const i = Math.floor(index / gridHeight);
			const j = index % gridHeight;
			const x = i * spacing + spacing / 2;
			const y = j * spacing + spacing / 2;
			const dot = Bodies.circle(x, y, dotRadius, {
				isStatic: true,
			}) as BodyWithSize;
			dot.size = dotRadius; // Store the original size
			dots.push(dot);
			World.add(world, dot);
		}

		// Add mouse control
		const mouse = Mouse.create(canvas);
		const mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 1,
				render: { visible: false },
			},
		});
		World.add(world, mouseConstraint);

		// Variable to store current and target mouse position
		let currentMousePos = { x: 0, y: 0 };
		let targetMousePos = { x: 0, y: 0 };

		Matter.Events.on(mouseConstraint, "mousemove", () => {
			targetMousePos = { ...mouse.position };
		});

		// Function to reset all dots to their original size and re-render them
		const resetDots = () => {
			// Clear the canvas
			context.clearRect(0, 0, canvas.width, canvas.height);

			// Reset the transformation matrix to identity
			context.setTransform(1, 0, 0, 1, 0, 0);

			// Reset the size of each dot and draw them
			for (const dot of dots) {
				dot.size = dotRadius;

				context.beginPath();
				context.arc(dot.position.x, dot.position.y, dotRadius, 0, 0);
				context.fillStyle = "rgba(255, 255, 255, 1)"; // Full opacity for reset dots
				context.fill();
			}
		};

		// Add an event listener for the 'mouseleave' event
		canvas.addEventListener("mouseleave", resetDots);

		// Run the engine
		const runner = Runner.create();
		Runner.run(runner, engine);

		// Function to interpolate the mouse position
		const interpolateMousePos = (
			current: typeof currentMousePos,
			target: typeof currentMousePos,
			factor: number,
		) => {
			return {
				x: current.x + (target.x - current.x) * factor,
				y: current.y + (target.y - current.y) * factor,
			};
		};

		// Rendering loop
		const render = () => {
			currentMousePos = interpolateMousePos(
				currentMousePos,
				targetMousePos,
				0.1,
			); // Adjust the factor for smoothness

			context.clearRect(0, 0, canvas.width, canvas.height);

			for (const dot of dots) {
				const dist = Math.hypot(
					currentMousePos.x - dot.position.x,
					currentMousePos.y - dot.position.y,
				);
				let m = dist / 20;
				m = 4.8 - m;
				m /= 4.8;
				let u = dot.size * m * 4.8;
				if (u < 1) u = 1;
				let f = (u + 1) / 8;
				if (f < 0.56) f = 0.56;

				context.beginPath();
				context.arc(dot.position.x, dot.position.y, u, 0, 2 * Math.PI);
				context.fillStyle = `rgba(255, 255, 255, ${f})`; // Set fillStyle to white
				context.fill();
			}

			requestAnimationFrame(render);
		};

		render();

		// Cleanup on component unmount
		return () => {
			Runner.stop(runner);
			Matter.World.clear(world, true);
			Matter.Engine.clear(engine);
			canvas.removeEventListener("mouseleave", resetDots);
		};
	}, [
		gridWidth,
		gridHeight,
		spacing,
		dotRadius,
		calcWidthByParent,
		calcWidthByParentOffset,
	]);

	return (
		<div ref={containerRef} className="w-full h-full">
			<canvas
				ref={canvasRef}
				className="relative z-10"
				width={window.innerWidth}
				height={window.innerHeight}
			/>
		</div>
	);
};

export default DotsGrid;
