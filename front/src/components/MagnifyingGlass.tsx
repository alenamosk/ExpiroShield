import * as React from "react";
import { SVGProps } from "react";

interface MagnifyingGlassIconProps {
  fill: string;
  stroke: string;
}

const MagnifyingGlassIcon = (props: MagnifyingGlassIconProps) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="w-6 h-6"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);
export default MagnifyingGlassIcon;
