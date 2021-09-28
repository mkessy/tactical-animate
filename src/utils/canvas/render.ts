import { PlayerOnBoard } from "../../types/Player";

type renderCanvasType = (
    ctx: CanvasRenderingContext2D,
    players: PlayerOnBoard[]
  ) => void;

const makeRenderFunction(ctx: CanvasRenderingContext2D, players: PlayerOnBoard[], width: number, height: number) => {

    return () => {

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

}

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