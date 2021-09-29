import { forwardRef } from "react";

type PureCanvasProps = {
  width: number;
  height: number;
};

export const PureCanvas = forwardRef<HTMLCanvasElement, PureCanvasProps>(
  (props, ref) => {
    return <canvas width={props.width} height={props.height} ref={ref} />;
  }
);
