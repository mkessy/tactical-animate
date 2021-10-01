import { PlayerOnBoard } from "../types/Player";
import { useCallback, useEffect, useRef, useState } from "react";
import { easeQuadInOut, interpolate } from "d3";
import { makeAnimatedRenderFunc } from "../utils/canvas/renders";
import config from "../config";
import { PureCanvas } from "./PureCanvas";

type AnimatedCanvasFrameProps = {
  players: PlayerOnBoard[];
};

export const AnimatedCanvasFrame = ({ players }: AnimatedCanvasFrameProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasReady, setCanvasReady] = useState<boolean>(false);

  const setCanvasRef = useCallback((node: HTMLCanvasElement) => {
    if (node) {
      canvasRef.current = node;
      setCanvasReady(true);
    }
  }, []);

  const { WIDTH, HEIGHT } = config.canvas;

  //TO-DO clean up event listeners and cancelAnimationFrame
  //TO-DO component clean up functions
  useEffect(() => {
    if (canvasReady) {
      console.error("canvas ready!");
      const ctx = canvasRef?.current?.getContext("2d");
      const renderFrameToCtx = makeAnimatedRenderFunc(ctx!, players);

      const runAnimation = () => {
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
      };

      runAnimation();
    } else {
      console.error("canvas not ready!");
    }
  }, [canvasReady, players]);

  return <PureCanvas width={WIDTH} height={HEIGHT} ref={setCanvasRef} />;
};
