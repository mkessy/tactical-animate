import React from "react";
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
  const onDragPlayer = (players: PlayerOnBoard[]) => {
    setGlobalCanvasState(players);
  };

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
