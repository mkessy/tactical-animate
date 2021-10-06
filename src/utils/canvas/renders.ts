import { PlayerOnBoard } from "../../types/Player";
import config from "../../config";
import interpolatePlayers from "./animation";

const renderPlayer = (
  ctx: CanvasRenderingContext2D,
  player: PlayerOnBoard
): void => {
  const { x, y, color, name } = player;
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(x + config.canvas.RADIUS, y);
    ctx.arc(x, y, config.canvas.RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
    if (player.active) {
      ctx.lineWidth = 5;
      ctx.stroke();
    }
    ctx.textAlign = "center";
    ctx.fillText(name, x, y + config.canvas.RADIUS + 12);
  }
};

interface PitchDimension {
  name: string;
  startingPoint: [number, number];
  shape: "rect" | "circle";
  length?: number;
  width?: number;
  radius?: number;
}

const { pitchDimensions } = config.football;

const renderPitch = (ctx: CanvasRenderingContext2D): void => {
  if (ctx) {
    for (const obj of pitchDimensions) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      if (obj.shape === "rect") {
        const { startingPoint, length, height } = obj;
        const [x, y] = startingPoint.map(scale);
        ctx.strokeRect(x, y, scale(length!), scale(height!));
      }
      if (obj.shape === "circle") {
        const { startingPoint, radius } = obj;
        const [x, y] = startingPoint.map(scale);
        ctx.arc(x, y, scale(radius!), 0, 2 * Math.PI);
        ctx.stroke();
      }
      if (obj.shape === "line") {
        const { startingPoint, endingPoint } = obj;
        const [x, y] = startingPoint.map(scale);
        const [x2, y2] = endingPoint!.map(scale);
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
  }
};

const scale = (dimension: number): number => {
  return dimension * config.canvas.WIDTH;
};

export const makeRenderFunc = (
  ctx: CanvasRenderingContext2D,
  players: PlayerOnBoard[]
) => {
  function render(): void {
    const { WIDTH, HEIGHT } = config.canvas;
    ctx?.clearRect(0, 0, WIDTH, HEIGHT);
    renderPitch(ctx);
    for (const p of players) {
      renderPlayer(ctx, p);
    }
  }
  return render;
};

export const makeAnimatedRenderFunc = (
  ctx: CanvasRenderingContext2D,
  players: PlayerOnBoard[]
) => {
  const interpolatedPlayers = interpolatePlayers(
    players,
    config.animation.DEFAULT_INTERPOLATOR
  );

  function render(t: number) {
    const { WIDTH, HEIGHT, RADIUS } = config.canvas;
    ctx?.clearRect(0, 0, WIDTH, HEIGHT);
    renderPitch(ctx);
    for (const { color, interpolator, name } of interpolatedPlayers) {
      const [x, y] = interpolator(t) as [number, number];
      ctx.beginPath();
      ctx.moveTo(x + RADIUS, y);
      ctx.arc(x, y, RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.fillText(name, x, y + config.canvas.RADIUS + 12);
    }
  }
  return render;
};
