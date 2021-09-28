type CordPair = [number, number];
type PlayerOnBoardHistory = CordPair[]

interface PlayerOnBoard {
    id: number;
    x: number;
    y: number;
    color: string;
    active: boolean;
    draggable: boolean;
    history: PlayerOnBoardHistory;
}

export type {PlayerOnBoard};