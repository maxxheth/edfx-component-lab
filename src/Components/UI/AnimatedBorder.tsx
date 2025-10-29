import React, { useState, useRef, useEffect } from 'react';

type AnimatedBorderProps = {
  children: React.ReactNode;
  className?: string;
};

const AnimatedBorder: React.FC<AnimatedBorderProps> = ({ children, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rectRef = useRef<SVGRectElement>(null);
  const [perimeter, setPerimeter] = useState(0);

  useEffect(() => {
    if (rectRef.current) {
      const rect = rectRef.current;
      const width = rect.width.baseVal.value;
      const height = rect.height.baseVal.value;
      const p = 2 * (width + height);
      setPerimeter(p);
    }
  }, []);

  return (
    <div
      className={`relative p-4 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">{children}</div>
      <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
        <rect
          ref={rectRef}
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray={perimeter}
          strokeDashoffset={isHovered ? 0 : perimeter}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
        />
      </svg>
    </div>
  );
};

export default AnimatedBorder;
