import * as React from "react";
import { SVGProps } from "react";

interface TagIconProps {
  fill: string;
  stroke: string;
  className?: string;
}

const TagIcon = (props: TagIconProps) => (
  <svg
    className={props.className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="w-6 h-6"
      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
    />
  </svg>
  // </div>
);

export default TagIcon;
