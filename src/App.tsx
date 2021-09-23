import React, { useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import TacticalBoard from "./components/TacticalBoard";
import { useEffect, useState } from "react";
import { PlayerOnBoard } from "./types/Player";
import { fetchPlayerData } from "./utils/fetchPlayerData";
import {
  schemeCategory10,
  select,
  drag,
  D3DragEvent,
  DraggedElementBaseType,
} from "d3";

const radius = 16;
const width = 800;
const height = 600;

const initialPlayers = require("./testPlayers.json");

const draw = (ctx: CanvasRenderingContext2D | null, player: PlayerOnBoard) => {
  if (ctx) {
    ctx.moveTo(player.x + radius, player.y);
    ctx.arc(player.x, player.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = player.color;
  }
};

function App() {
  const [players, setPlayers] = useState<PlayerOnBoard[]>(initialPlayers);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dragsubject = (
    event: D3DragEvent<DraggedElementBaseType, null, PlayerOnBoard>
  ) => {
    //console.log(event);
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
  };

  const dragstarted = (
    event: D3DragEvent<DraggedElementBaseType, null, PlayerOnBoard>
  ) => {
    //console.log(event.x, event.y);
    const playersCopy: PlayerOnBoard[] = [...players];
    setPlayers([...playersCopy].splice(players.indexOf(event.subject), 1));
    setPlayers([...players, event.subject]);
  };

  //need to be clever about how we change the state here...
  //we should probably store the players by id. then i can easily
  const dragged = (
    event: D3DragEvent<DraggedElementBaseType, null, PlayerOnBoard>
  ) => {
    //console.log(event.x + " " + event.y);
    //console.log("Dragging: " + event.subject.id);
  };

  const dragended = (
    event: D3DragEvent<DraggedElementBaseType, null, PlayerOnBoard>
  ) => {
    //console.log("finished dragging: " + event.subject.id);
  };

  const canvasDrag = drag<HTMLCanvasElement, unknown, unknown>()
    .subject(dragsubject)
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);

  const canvas = canvasRef.current;
  if (canvas) {
    const canvasSelection = select(canvas);
    canvasSelection.call(canvasDrag);
  }

  useEffect(() => {
    const ctx = canvas ? canvas.getContext("2d") : null;
    ctx?.clearRect(0, 0, width, height);
    players.forEach((player) => draw(ctx, player));
  });

  console.log("Rendering canvas");
  console.log(canvasDrag);

  return (
    <div className="border-solid rounded border-r-4 border-gray-300">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={() => {
          const ctx = canvasRef.current
            ? canvasRef.current.getContext("2d")
            : null;
          //console.log(players);
          for (const p of players) {
            draw(ctx, p);
          }
        }}
      />
    </div>
  );
}

export default App;
