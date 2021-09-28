import { PlayerOnBoard } from "./Player";

interface CanvasContainerProps {
    players: PlayerOnBoard[];
    onCanvasStateChange: (players: PlayerOnBoard[]) => void;
  };

export type {CanvasContainerProps};


