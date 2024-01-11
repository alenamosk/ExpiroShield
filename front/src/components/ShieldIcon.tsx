import * as React from "react";
import { SVGProps } from "react";

interface ShieldIconProps {
  fill: string;
  stroke: string;
}

const ShieldIcon = (props: ShieldIconProps) => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="cls-2"
      d="M30.182 7.271c-5.226-1.407-9.805-3.424-13.985-6.022l.219.127a.743.743 0 0 0-.835.002l.003-.002C11.623 3.847 7.045 5.864 2.18 7.188l-.362.084a.751.751 0 0 0-.548.901l-.001-.005c.212.923 5.312 22.583 14.73 22.583 9.42 0 14.518-21.66 14.73-22.583a.75.75 0 0 0-.544-.895l-.005-.001zM16 29.25c-7.377 0-12.146-17.019-13.095-20.717 4.977-1.394 9.327-3.318 13.322-5.766l-.227.13c3.768 2.319 8.118 4.243 12.729 5.548l.367.089C28.147 12.232 23.377 29.251 16 29.251zm-.75-18.419v4.419h-4.419a.75.75 0 0 0 0 1.5h4.419v4.42a.75.75 0 0 0 1.5 0v-4.42h4.42a.75.75 0 0 0 0-1.5h-4.42v-4.419a.75.75 0 0 0-1.5 0z"
    />
  </svg>
);

export default ShieldIcon;
