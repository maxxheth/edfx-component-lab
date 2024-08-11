import React, { useState, useEffect, useRef } from 'react';

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const followerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect((): void => {
	const followMouse = () => {
		const { x, y } = mouseRef.current;
		setPosition((prev) => ({
			x: prev.x + (x - prev.x) * 0.1,
			y: prev.y + (y - prev.y) * 0.1,
		}));
		requestAnimationFrame(followMouse);
	};

	followMouse();
}, []);

  return (
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
		  zIndex: 100,
          width: 20,
          height: 20,
          backgroundColor: 'red',
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'transform 0.3s ease-out',
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
  );
};

export default MouseFollower;