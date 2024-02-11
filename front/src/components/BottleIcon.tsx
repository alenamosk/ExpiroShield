import * as React from "react";
import { SVGProps } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BottleIconProps {
  className: string;
  important: boolean;
}

const BottleIcon = (props: BottleIconProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex items-center justify-center">
          <svg
            className={props.className}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              style={{
                fill: props.important ? "#f97316" : "none",
                stroke: "#7c2d12",
                strokeLinejoin: "round",
              }}
              className="cls-1"
              d="m22.55 3.5-1.9 19.14a1 1 0 0 1-1 .86H12.5a1 1 0 0 1-1-.86L9.45 3.5Z"
            />
            <path
              style={{
                fill: props.important ? "#f97316" : "none",
                stroke: "#7c2d12",
                strokeLinejoin: "round",
              }}
              className="cls-1"
              d="M19.5 23.5v4a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-4Z"
            />
            <path
              style={{
                fill: props.important ? "#f97316" : "none",
                stroke: "#7c2d12",
                strokeLinejoin: "round",
              }}
              d="M9.5 5.5h13"
            />
          </svg>
        </TooltipTrigger>

        <TooltipContent>
          {props.important ? (
            <p>You have marked this as an important product</p>
          ) : (
            <p>You have marked this as an unimportant product</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BottleIcon;
