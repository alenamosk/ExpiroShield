import * as React from "react";
import { SVGProps } from "react";

interface CategoryIconProps {
  fill: string;
  stroke: string;
}

const CategoryIcon = (props: CategoryIconProps) => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="cls-2"
      d="M24,10h0a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2h0a2,2,0,0,1-2,2H26A2,2,0,0,1,24,10Z"
    />

    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="cls-2"
      d="M24,24h0a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2h0a2,2,0,0,1-2,2H26A2,2,0,0,1,24,24Z"
    />

    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="cls-2"
      d="M24,38h0a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2h0a2,2,0,0,1-2,2H26A2,2,0,0,1,24,38Z"
    />

    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="cls-2"
      d="M12,7.9,14.4,12H9.5L12,7.9M12,2a2.1,2.1,0,0,0-1.7,1L4.2,13a2.3,2.3,0,0,0,0,2,1.9,1.9,0,0,0,1.7,1H18a2.1,2.1,0,0,0,1.7-1,1.8,1.8,0,0,0,0-2l-6-10A1.9,1.9,0,0,0,12,2Z"
    />

    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="cls-2"
      d="M12,30a6,6,0,1,1,6-6A6,6,0,0,1,12,30Zm0-8a2,2,0,1,0,2,2A2,2,0,0,0,12,22Z"
    />

    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="cls-2"
      d="M16,44H8a2,2,0,0,1-2-2V34a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2v8A2,2,0,0,1,16,44Zm-6-4h4V36H10Z"
    />
  </svg>
);

export default CategoryIcon;
