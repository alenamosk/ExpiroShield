import * as React from "react";
import { SVGProps } from "react";

interface BottleIconProps {
  fill: string;
  stroke: string;
}

const BottleIcon = (props: BottleIconProps) => (
  // <div className="bg-black rounded-full aspect-1 items-center">
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
        strokeLinejoin: "round",
      }}
      className="cls-1"
      d="m22.55 3.5-1.9 19.14a1 1 0 0 1-1 .86H12.5a1 1 0 0 1-1-.86L9.45 3.5Z"
    />
    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
        strokeLinejoin: "round",
      }}
      className="cls-1"
      d="M19.5 23.5v4a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-4Z"
    />
    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
        strokeLinejoin: "round",
      }}
      d="M9.5 5.5h13"
    />
  </svg>
  // </div>
);

export default BottleIcon;
