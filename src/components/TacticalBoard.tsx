import { PlayerOnBoard } from "../types/Player";
import { forwardRef, useEffect, useRef } from "react";
import { select, D3DragEvent, drag } from "d3";

type CanvasProps = {
  width: number;
  height: number;
};

type D3CanvasDragEvent = D3DragEvent<HTMLCanvasElement, null, PlayerOnBoard>;

type CanvasContainerProps = {
  players: PlayerOnBoard[];
  onCanvasStateChange: (players: PlayerOnBoard[]) => void;
  width: number;
  height: number;
  renderCanvas: renderCanvasType;
};

function renderPlayersToCanvas(ctx, players): renderCanvasType {
  ctx?.clearRect(0, 0, width, height);
  for (const {
    x,
    y,
    color,
    active,
    draggable,
  } of PlayersOnBoardState.current) {
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      if (!draggable) {
        ctx.fillStyle = "black";
        ctx.fill();
      } else {
        ctx.fillStyle = color;
        ctx.fill();
      }
      if (active) {
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

export const PureCanvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  (props, ref) => {
    return <canvas width={props.width} height={props.height} ref={ref} />;
  }
);

export const CanvasContainer = ({
  players,
  onCanvasStateChange,
  width,
  height,
  renderCanvas,
}: CanvasContainerProps) => {
  const radius = 16;

  const canvasContainerRef = useRef<HTMLCanvasElement>(null);
  //consider this local state for the canvas
  const PlayersOnBoardState = useRef<PlayerOnBoard[]>(players);

  useEffect(() => {
    const canvasContainer = select(canvasContainerRef.current);

    // most important function for delivering a responsive experience
    const dragsubject = (event: D3CanvasDragEvent) => {
      let subject = null;
      let distance = Infinity;
      for (const p of PlayersOnBoardState.current) {
        let d = Math.hypot(event.x - p.x, event.y - p.y);
        if (d < distance) {
          distance = d;
          subject = p;
        }
      }
      return subject?.draggable ? subject : null;
    };

    const ctx = canvasContainer.node()?.getContext("2d");
    const canvasDrag = drag()
      .subject(dragsubject)
      .on("start", (e: D3CanvasDragEvent) => {
        const { subject } = e;
        subject.active = true;
        const players = PlayersOnBoardState.current;
        players.splice(players.indexOf(subject), 1);
        players.push(subject);
        PlayersOnBoardState.current = players;
      })
      .on("drag", (e: D3CanvasDragEvent) => {
        e.subject.x = Math.max(0, Math.min(width, e.x));
        e.subject.y = Math.max(0, Math.min(height, e.y));
      })
      .on("end", (e: D3CanvasDragEvent) => {
        const { subject } = e;
        subject.history.push([subject.x, subject.y]);
        subject.active = false;
        //subject.draggable = false;
      })
      .on("start.draw drag.draw end.draw", () => {
        ctx?.clearRect(0, 0, width, height);
        for (const {
          x,
          y,
          color,
          active,
          draggable,
        } of PlayersOnBoardState.current) {
          if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            if (!draggable) {
              ctx.fillStyle = "black";
              ctx.fill();
            } else {
              ctx.fillStyle = color;
              ctx.fill();
            }
            if (active) {
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
        // this hoists the local "canvas state" up to the parent component
        // you need to send a copy because the *reference* to the players ref doesn't change
        onCanvasStateChange([...PlayersOnBoardState.current]);
      });

    canvasContainer.call(canvasDrag as any);

    // functionality for adding over events. can reuse subject funciton from drag api
    /* canvasContainer.on("mousemove", (e) => {
      const [x, y] = pointer(e, canvasContainer.node());
      console.error(x, y);
    }); */
  }, [onCanvasStateChange]);

  return <PureCanvas width={width} height={height} ref={canvasContainerRef} />;
};
