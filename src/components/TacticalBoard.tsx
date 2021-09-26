import { PlayerOnBoard } from "../types/Player";
import BoardDimensions from "../types/TacticalBoard";
import useTacticalBoardCanvas from "../hooks/useTacticalBoardCanvas";
import {
  forwardRef,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { select, D3DragEvent, drag } from "d3";
import { JsxElement } from "typescript";

type CanvasProps = {
  width: number;
  height: number;
};

type CanvasContainerProps = {
  playerData: PlayerOnBoard[];
  setPlayerData: (players: PlayerOnBoard[]) => void;
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

export const CanvasContainer = (props: CanvasContainerProps) => {
  const radius = 16;
  const width = 500;
  const height = 500;

  const canvasContainerRef = useRef<HTMLCanvasElement>(null);
  const playersToDrag = useRef<PlayerOnBoard[]>(props.playerData);

  useEffect(() => {
    const canvasContainer = select(canvasContainerRef.current);

    const dragsubject = (
      event: D3DragEvent<HTMLCanvasElement, unknown, unknown>
    ) => {
      let subject = null;
      let distance = Infinity;
      for (const p of playersToDrag.current) {
        let d = Math.hypot(event.x - p.x, event.y - p.y);
        if (d < distance) {
          distance = d;
          subject = p;
        }
      }
      return subject;
    };

    const ctx = canvasContainer.node()?.getContext("2d");
    const canvasDrag = drag()
      .subject(dragsubject)
      .on("start", (e) => {
        const players = playersToDrag.current;
        players.splice(players.indexOf(e.subject), 1);
        players.push(e.subject);
        playersToDrag.current = players;
      })
      .on("drag", (e) => {
        e.subject.x = Math.max(0, Math.min(width, e.x));
        e.subject.y = Math.max(0, Math.min(height, e.y));
      })
      .on("end", (e) => {})
      .on("start.draw drag.draw end.draw", () => {
        ctx?.clearRect(0, 0, width, height);
        for (const { x, y, color } of playersToDrag.current) {
          if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
          }
        }
        props.setPlayerData(playersToDrag.current);
      });

    canvasContainer.call(canvasDrag as any);
  }, [props]);

  return <PureCanvas width={width} height={height} ref={canvasContainerRef} />;
};
