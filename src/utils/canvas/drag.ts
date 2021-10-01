import { PlayerOnBoard } from "../../types/Player";
import { D3DragEvent } from "d3-drag";
import config from "../../config";
import { pointer } from "d3";

type D3CanvasDragEvent = D3DragEvent<HTMLCanvasElement, null, PlayerOnBoard>;

const { WIDTH, HEIGHT } = config.canvas;

export const findSubject = (
  players: PlayerOnBoard[],
  event: D3CanvasDragEvent
) => {
  let subject = null;
  let distance = Infinity;
  for (const p of players) {
    let d = Math.hypot(event.x - p.x, event.y - p.y);
    if (d < distance) {
      distance = d;
      subject = p;
    }
  }
  return subject?.draggable ? subject : null;
};

export function makeDragSubjectFunc(players: PlayerOnBoard[]) {
  return (event: D3CanvasDragEvent) => {
    return findSubject(players, event);
  };
}

export function makeOnDragStartFunc(players: PlayerOnBoard[]) {
  const ondragstart = (e: D3CanvasDragEvent) => {
    const { subject } = e;
    subject.active = true;
    players.splice(players.indexOf(subject), 1);
    players.push(subject);
  };

  return ondragstart;
}

export function makeOnDragFunc(players: PlayerOnBoard[]) {
  const ondrag = (e: D3CanvasDragEvent): void => {
    e.subject.x = Math.max(0, Math.min(WIDTH, e.x));
    e.subject.y = Math.max(0, Math.min(HEIGHT, e.y));
  };
  return ondrag;
}

export function makeOnDragEndFunc(players: PlayerOnBoard[]) {
  const ondragend = (e: D3CanvasDragEvent): void => {
    const { subject } = e;
    subject.history.push([subject.x, subject.y]);
    subject.active = false;
    //subject.draggable = false;
  };

  return ondragend;
}

export function makeOnDblClickFunc(
  players: PlayerOnBoard[]
): (e: Event) => void {
  const ondoubleclick = (e: Event): void => {
    const [x, y] = pointer(e);
    let subject = null;
    let distance = Infinity;
    for (const p of players) {
      let d = Math.hypot(x - p.x, y - p.y);
      if (d < distance) {
        distance = d;
        subject = p;
      }
    }
    if (subject) {
      players.splice(players.indexOf(subject), 1);
    }
  };

  return ondoubleclick;
}
