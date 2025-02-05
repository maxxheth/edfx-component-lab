import React, { useState, useRef, useEffect } from "react";
import { Button, ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface RippleProps {
  x: number;
  y: number;
  size: number;
}

const MaterialButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const [ripples, setRipples] = useState<RippleProps[]>([]);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (ripples.length > 0) {
          setRipples([]);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }, [ripples]);

    const addRipple = (
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>,
    ) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = "clientX" in event ? event.clientX - rect.left : rect.width / 2;
      const y = "clientY" in event ? event.clientY - rect.top : rect.height / 2;

      setRipples([...ripples, { x, y, size }]);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        addRipple(event);
      }
    };

    return (
      <Button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          "relative overflow-hidden transition-shadow hover:shadow-md focus:shadow-md",
          className,
        )}
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
      </Button>
    );
  },
);

MaterialButton.displayName = "MaterialButton";

export { MaterialButton };
