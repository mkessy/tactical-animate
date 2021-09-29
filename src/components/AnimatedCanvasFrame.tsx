import { PlayerOnBoard } from "../types/Player";
import { useEffect, useRef } from "react";
import { interpolate } from "d3";
import makeRenderFunc, {
  makeAnimatedRenderFunc,
} from "../utils/canvas/renders";
import config from "../config";
import { PureCanvas } from "./PureCanvas";

interface AnimationConfig {
  tStep: number;
  interpolator: typeof interpolate;
}

export const AnimatedCanvasFrame = (
  players: PlayerOnBoard[],
  animationConfig: AnimationConfig
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { WIDTH, HEIGHT } = config.canvas;

  useEffect(() => {
    const ctx = canvasRef?.current?.getContext("2d");
    const renderFrameToCtx = makeAnimatedRenderFunc(ctx!, players);
  }, []);

  return <PureCanvas width={WIDTH} height={HEIGHT} ref={canvasRef} />;
};
