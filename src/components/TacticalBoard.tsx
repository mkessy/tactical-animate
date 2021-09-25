import { PlayerOnBoard } from "../types/Player";
import BoardDimensions from "../types/TacticalBoard";
import useTacticalBoardCanvas from "../hooks/useTacticalBoardCanvas";
import { forwardRef, useEffect, useRef, useState } from "react";

type CanvasProps = {
  width: number;
  height: number;
};

export const PureCanvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  (props, ref) => {
    return <canvas width={props.width} height={props.height} ref={ref} />;
  }
);

export const Canvas = (props: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <PureCanvas ref={canvasRef} width={props.width} height={props.height} />
  );
};

export const CanvasContainer = (playerData: PlayerOnBoard[]) => {
  const [players, setPlayers] = useState<PlayerOnBoard[]>(playerData);
};
