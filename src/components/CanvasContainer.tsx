import { PlayerOnBoard } from "../types/Player";
import { useCallback, useEffect, useRef, useState } from "react";
import { select, drag, pointer } from "d3";
import { makeRenderFunc } from "../utils/canvas/renders";
import config from "../config";
import {
  findSubject,
  makeDragSubjectFunc,
  makeOnDblClickFunc,
  makeOnDragEndFunc,
  makeOnDragFunc,
  makeOnDragStartFunc,
} from "../utils/canvas/drag";
import { CanvasContainerProps } from "../types/Canvas";
import { PureCanvas } from "./PureCanvas";

export const CanvasContainer = ({
  players,
  onCanvasStateChange,
}: CanvasContainerProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasReady, setCanvasReady] = useState<boolean>(false);
  const { WIDTH, HEIGHT } = config.canvas;

  //consider this local state for the canvas
  const PlayersOnBoardState = useRef<PlayerOnBoard[]>(players);

  const setCanvasRef = useCallback((node: HTMLCanvasElement) => {
    if (node) {
      canvasRef.current = node;
      setCanvasReady(true);
    }
  }, []);

  //TO-DO clean up event listeners and cancelAnimationFrame
  //TO-DO component clean up functions

  const setUpCanvas = useCallback(() => {
    console.error("canvas ready!");
    const dragSubject = makeDragSubjectFunc(PlayersOnBoardState.current);
    const onDragStart = makeOnDragStartFunc(PlayersOnBoardState.current);
    const onDrag = makeOnDragFunc(PlayersOnBoardState.current);
    const onDragEnd = makeOnDragEndFunc(PlayersOnBoardState.current);
    const canvasContainer = select(canvasRef.current);
    const ctx = canvasContainer.node()?.getContext("2d");
    const onDblClick = makeOnDblClickFunc(PlayersOnBoardState.current);

    const render = makeRenderFunc(ctx!, PlayersOnBoardState.current);

    // most important function for delivering a responsive experience

    const canvasDrag = drag()
      .subject(dragSubject)
      .on("start", onDragStart)
      .on("drag", onDrag)
      .on("end", onDragEnd)
      .on("start.render drag.render end.render", () => {
        render();
        // this sends the local "canvas state" up to the parent component
        // you need to send a copy because the *reference* to the players ref doesn't change
        onCanvasStateChange([...PlayersOnBoardState.current]);
      });

    canvasContainer.on("dblclick", (e: Event) => {
      onDblClick(e);
      render();
    });

    canvasContainer.call(canvasDrag as any);
    render();
  }, [onCanvasStateChange]);

  useEffect(() => {
    if (canvasReady) {
      setUpCanvas();
    } else {
      console.error("canvas not yet ready");
    }
  }, [canvasReady, setUpCanvas]);

  return <PureCanvas width={WIDTH} height={HEIGHT} ref={setCanvasRef} />;
};
