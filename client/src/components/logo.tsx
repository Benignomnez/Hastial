import React from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  width = 300,
  height = 100,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Techo de la casa */}
      <path
        d="M 70,35 L 150,10 L 230,35 L 230,10 L 260,10 L 260,50 L 70,50 Z"
        fill="black"
      />

      {/* Línea vertical derecha */}
      <rect x="230" y="10" width="5" height="75" fill="black" />

      {/* Base rallada */}
      <rect x="0" y="50" width="300" height="40" fill="url(#diagonalHatch)" />

      {/* Texto HASTIAL */}
      <text
        x="205"
        y="43"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="32"
        fill="black"
        textAnchor="end"
      >
        HASTIAL
      </text>

      {/* Patrón de líneas diagonales */}
      <defs>
        <pattern
          id="diagonalHatch"
          patternUnits="userSpaceOnUse"
          width="6"
          height="6"
          patternTransform="rotate(45)"
        >
          <rect width="3" height="6" fill="white" />
          <rect x="3" width="3" height="6" fill="black" />
        </pattern>
      </defs>
    </svg>
  );
};

export default Logo;
