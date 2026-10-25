import type { SVGProps } from "react";

export function Pterodactyls(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1440 300"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
      {...props}
    >
      <g transform="translate(0 150)">
        <g className="fly">
          <path
            d="M-26 0 Q-13 -14 0 0 Q13 -14 26 0 Q13 -4 0 7 Q-13 -4 -26 0Z"
            fill="#04110a"
            opacity=".85"
          />
        </g>
      </g>
      <g transform="translate(0 235)">
        <g className="fly2">
          <path
            d="M-20 0 Q-10 -11 0 0 Q10 -11 20 0 Q10 -3 0 5 Q-10 -3 -20 0Z"
            fill="#04110a"
            opacity=".85"
          />
        </g>
      </g>
    </svg>
  );
}
