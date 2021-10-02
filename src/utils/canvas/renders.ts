import { PlayerOnBoard } from "../../types/Player";
import config from "../../config";
import { render } from "react-dom";
import { interpolate } from "d3-interpolate";
import interpolatePlayers from "./animation";

const renderPlayer = (
  ctx: CanvasRenderingContext2D,
  player: PlayerOnBoard
): void => {
  const { x, y, color } = player;
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(x + config.canvas.RADIUS, y);
    ctx.arc(x, y, config.canvas.RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    if (player.active) {
      ctx.lineWidth = 1;
      ctx.stroke();
    }
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
      if (obj.shape === "rect") {
      }
    }
  }
};

export const makeRenderFunc = (
  ctx: CanvasRenderingContext2D,
  players: PlayerOnBoard[]
) => {
  function render(): void {
    const { WIDTH, HEIGHT } = config.canvas;
    ctx?.clearRect(0, 0, WIDTH, HEIGHT);
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
    for (const { color, interpolator } of interpolatedPlayers) {
      const [x, y] = interpolator(t) as [number, number];
      ctx.beginPath();
      ctx.moveTo(x + RADIUS, y);
      ctx.arc(x, y, RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
  return render;
};
