import { PlayerOnBoard } from "../types/Player";
import { forwardRef, useEffect, useRef } from "react";
import { select, drag } from "d3";
import makeRenderFunc from "../utils/canvas/render";
import config from "../config";
import {
  makeDragSubjectFunc,
  makeOnDragEndFunc,
  makeOnDragFunc,
  makeOnDragStartFunc,
} from "../utils/canvas/drag";
import { CanvasContainerProps } from "../types/Canvas";

type PureCanvasProps = {
  width: number;
  height: number;
};

export const PureCanvas = forwardRef<HTMLCanvasElement, PureCanvasProps>(
  (props, ref) => {
    return <canvas width={props.width} height={props.height} ref={ref} />;
  }
);

export const CanvasContainer = ({
  players,
  onCanvasStateChange,
}: CanvasContainerProps) => {
  const canvasContainerRef = useRef<HTMLCanvasElement>(null);
  //consider this local state for the canvas
  const PlayersOnBoardState = useRef<PlayerOnBoard[]>(players);
  const dragSubject = makeDragSubjectFunc(PlayersOnBoardState.current);
  const onDragStart = makeOnDragStartFunc(PlayersOnBoardState.current);
  const onDrag = makeOnDragFunc(PlayersOnBoardState.current);
  const onDragEnd = makeOnDragEndFunc(PlayersOnBoardState.current);
  const { WIDTH, HEIGHT } = config.canvas;

  useEffect(() => {
    const canvasContainer = select(canvasContainerRef.current);
    const ctx = canvasContainer.node()?.getContext("2d");

    const render = makeRenderFunc(ctx!, PlayersOnBoardState.current);

    // most important function for delivering a responsive experience

    const canvasDrag = drag()
      .subject(dragSubject)
      .on("start", onDragStart)
      .on("drag", onDrag)
      .on("end", onDragEnd)
      .on("start.render drag.render end.render", () => {
        render();
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
  }, [onCanvasStateChange, onDragStart, onDragEnd, onDrag, dragSubject]);

  return <PureCanvas width={WIDTH} height={HEIGHT} ref={canvasContainerRef} />;
};
