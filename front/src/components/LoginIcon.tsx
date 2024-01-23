import * as React from "react";
import { SVGProps } from "react";

interface LoginIconProps {
  fill: string;
  stroke: string;
}

const LoginIcon = (props: LoginIconProps) => (
  <svg viewBox="0 0 481.5 481.5" xmlns="http://www.w3.org/2000/svg">
    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="w-6 h-6"
      d="M0,240.7c0,7.5,6,13.5,13.5,13.5h326.1l-69.9,69.9c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l93-93 c5.3-5.3,5.3-13.8,0-19.1l-93-93c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l69.9,69.9h-326C6,227.2,0,233.2,0,240.7z"
    />
    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="w-6 h-6"
      d="M382.4,0H99C44.4,0,0,44.4,0,99v58.2c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V99c0-39.7,32.3-72,72-72h283.5 c39.7,0,72,32.3,72,72v283.5c0,39.7-32.3,72-72,72H99c-39.7,0-72-32.3-72-72V325c0-7.5-6-13.5-13.5-13.5S0,317.5,0,325v57.5 c0,54.6,44.4,99,99,99h283.5c54.6,0,99-44.4,99-99V99C481.4,44.4,437,0,382.4,0z"
    />
  </svg>
);
export default LoginIcon;