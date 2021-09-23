import { PlayerOnBoard } from "../../types/Player";
import { D3DragEvent, drag, DraggedElementBaseType} from "d3";

export default function dragsubject(event: D3DragEvent<DraggedElementBaseType, null, PlayerOnBoard>) {
    let subject: PlayerOnBoard | null = null;
    let distance = Infinity;
    for (const c of players) {
      let d = Math.hypot(event.x - c.x, event.y - c.y);
      if (d < distance) {
        distance = d;
        subject = c;
      }
    }
    return subject;
  }

const canvasDrag = (players: PlayerOnBoard[]) => {
    // Choose the circle that is closest to the pointer for dragging.
    
  
    // When starting a drag gesture, move the subject to the top and mark it as active.
    function dragstarted(event: D3DragEvent<DraggedElementBaseType, null, PlayerOnBoard>) {
      players.splice(players.indexOf(event.subject), 1);
      players.push(event.subject);
      event.subject. = true;
      event.subject.start.x = event.subject.x;
      event.subject.start.y = event.subject.y;
    }
  
    // When dragging, update the subject’s position.
    function dragged(event) {
      const subject = event.subject;
      event.subject.x = Math.max(0, Math.min(width, event.x));
      event.subject.y = Math.max(0, Math.min(height, event.y));
    }
  
    // When ending a drag gesture, mark the subject as inactive again.
    function dragended(event) {
      const { subject } = event;
      subject.active = false;
      const x = event.x;
      const y = event.y;
      subject.end.x = x;
      subject.end.y = y;
      subject.history.push(Object.values(subject.end));
  
      // event.subject.draggable = false;
      // players.splice(players.indexOf(event.subject), 1);
    }
  
    return drag()
      .subject(dragsubject)
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }
