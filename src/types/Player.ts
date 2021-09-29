import { interpolate, interpolateArray } from "d3";

type PlayerOnBoardHistory = [number, number][]

interface PlayerOnBoard {
    id: number;
    x: number;
    y: number;
    color: string; // style type
    active: boolean;
    draggable: boolean;
    history: PlayerOnBoardHistory;
    team?: string;
}

interface InterpolatedPlayer {
  id: number;
  color: string;
  interpolator: ReturnType<typeof interpolate>
}
export type {PlayerOnBoard, InterpolatedPlayer};