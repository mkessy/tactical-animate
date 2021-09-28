import { PlayerOnBoard } from "../../types/Player";
import config from "../../config";
import { render } from "react-dom";

type renderCanvasType = (
    ctx: CanvasRenderingContext2D,
    players: PlayerOnBoard[]
  ) => void;

const makeRenderFunc = (ctx: CanvasRenderingContext2D, players: PlayerOnBoard[]) => {

     function render(): void {

      const {WIDTH, HEIGHT} = config.canvas
        ctx?.clearRect(0, 0, WIDTH, HEIGHT);
        for (const {
          x,
          y,
          color,
          active,
          draggable,
        } of players) {
          if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x + config.canvas.RADIUS, y);
            ctx.arc(x, y, config.canvas.RADIUS, 0, 2 * Math.PI);
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
    
    return render;

}

export default makeRenderFunc;