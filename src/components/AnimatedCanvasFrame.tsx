import { PlayerOnBoard } from "../types/Player";
import { useEffect, useRef } from "react";
import { easeQuadInOut, interpolate } from "d3";
import { makeAnimatedRenderFunc } from "../utils/canvas/renders";
import config from "../config";
import { PureCanvas } from "./PureCanvas";

type AnimatedCanvasFrameProps = {
  players: PlayerOnBoard[];
};

export const AnimatedCanvasFrame = ({ players }: AnimatedCanvasFrameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { WIDTH, HEIGHT } = config.canvas;
  const ctx = canvasRef?.current?.getContext("2d");
  const renderFrameToCtx = makeAnimatedRenderFunc(ctx!, players);

  useEffect(() => {
    console.error("running animation maybe");
    if (!ctx) {
      console.error("no context :(");
      return;
    }

    let frame: ReturnType<typeof requestAnimationFrame>;
    let start: number;
    const duration = config.animation.DURATION;

    function tick(timestamp: number) {
      if (start === undefined) start = timestamp;
      const elapsed = timestamp - start;
      const t = easeQuadInOut(elapsed / duration);
      console.error(t);
      renderFrameToCtx(t);

      if (elapsed < duration) frame = requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [ctx, renderFrameToCtx]);

  return <PureCanvas width={WIDTH} height={HEIGHT} ref={canvasRef} />;
};
