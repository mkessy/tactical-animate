import { interpolate } from "d3";

type PlayerOnBoardHistory = [number, number][];

interface PlayerOnBoard {
  id: number;
  name: string;
  age: number;
  position: string;
  photoUrl: string;
  number?: number | null;
  x: number;
  y: number;
  color: string; // style type
  active: boolean;
  draggable: boolean;
  history: PlayerOnBoardHistory;
  team?: string;
}

interface InterpolatedPlayer extends PlayerOnBoard {
  interpolator: ReturnType<typeof interpolate>;
}
export type { PlayerOnBoard, InterpolatedPlayer };
