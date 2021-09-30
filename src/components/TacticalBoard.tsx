import React, { useCallback } from "react";
import { CanvasContainerProps } from "../types/Canvas";
import { PlayerOnBoard } from "../types/Player";
import { CanvasContainer } from "./CanvasContainer";

type TacticalBoardProps = {
  initPlayers: PlayerOnBoard[];
  setGlobalCanvasState: (players: PlayerOnBoard[]) => void;
};

export default function TacticalBoard({
  initPlayers,
  setGlobalCanvasState,
}: TacticalBoardProps) {
  const onDragPlayer = useCallback(
    (players: PlayerOnBoard[]) => {
      setGlobalCanvasState(players);
    },
    [setGlobalCanvasState]
  );

  const canvasProps: CanvasContainerProps = {
    players: initPlayers,
    onCanvasStateChange: onDragPlayer,
  };

  return (
    <>
      <CanvasContainer {...canvasProps} />;
    </>
  );
}
