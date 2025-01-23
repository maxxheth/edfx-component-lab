import React, { useState, useRef, useEffect } from "react";
import { Button, ButtonProps } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from "framer-motion";

interface RippleProps {
	x: number;
	y: number;
	size: number;
}

const MotionButton = motion(Button);

const MagnetMaterialButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, ...props }, ref) => {
		const [ripples, setRipples] = useState<RippleProps[]>([]);
		const buttonRef = useRef<HTMLButtonElement | null>(null);

		// Magnet effect setup
		const x = useMotionValue(0);
		const y = useMotionValue(0);
		const xSpring = useSpring(x, { mass: 3, stiffness: 400, damping: 50 });
		const ySpring = useSpring(y, { mass: 3, stiffness: 400, damping: 50 });
		const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

		useEffect(() => {
			const timer = setTimeout(() => {
				setRipples([]);
			}, 1000);
			return () => clearTimeout(timer);
		}, [ripples]);

		const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (!buttonRef.current) return;
			const rect = buttonRef.current.getBoundingClientRect();
			x.set(e.clientX - (rect.left + rect.width / 2));
			y.set(e.clientY - (rect.top + rect.height / 2));
		};

		const handleMouseLeave = () => {
			x.set(0);
			y.set(0);
		};

		const addRipple = (
			event:
				| React.MouseEvent<HTMLButtonElement>
				| React.KeyboardEvent<HTMLButtonElement>,
		) => {
			if (!buttonRef.current) return;
			const rect = buttonRef.current.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = "clientX" in event ? event.clientX - rect.left : rect.width / 2;
			const y = "clientY" in event ? event.clientY - rect.top : rect.height / 2;
			setRipples((prev) => [...prev, { x, y, size }]);
		};

		const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
			if (event.key === "Enter" || event.key === " ") addRipple(event);
		};

		return (
			<MotionButton
				ref={(node) => {
					buttonRef.current = node;
					if (typeof ref === "function") ref(node);
					else if (ref) ref.current = node;
				}}
				className={cn(
					"relative overflow-hidden transition-shadow hover:shadow-md focus:shadow-md",
					className,
				)}
				style={{ transform }}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				onMouseDown={addRipple}
				onKeyDown={handleKeyDown}
				{...props}
			>
				{children}
				{ripples.map((ripple, index) => (
					<span
						key={index}
						style={{
							position: "absolute",
							left: ripple.x - ripple.size / 2,
							top: ripple.y - ripple.size / 2,
							width: ripple.size,
							height: ripple.size,
							borderRadius: "50%",
							backgroundColor: "rgba(255, 255, 255, 0.7)",
							transform: "scale(0)",
							animation: "ripple 0.6s linear",
						}}
					/>
				))}
			</MotionButton>
		);
	},
);

MagnetMaterialButton.displayName = "MagnetMaterialButton";

export { MagnetMaterialButton };
