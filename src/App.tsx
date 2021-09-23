import React, { useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import TacticalBoard from "./components/TacticalBoard";
import { useEffect, useState } from "react";
import { PlayerOnBoard } from "./types/Player";
import { fetchPlayerData } from "./utils/fetchPlayerData";
import {
  schemeCategory10,
  drag,
  D3DragEvent,
  DraggedElementBaseType,
} from "d3";
import dragsubject from "./utils/canvas/drag";

const radius = 16;

const draw = (ctx: CanvasRenderingContext2D, player: PlayerOnBoard) => {
  ctx.moveTo(player.x + radius, player.y);
  ctx.arc(player.x, player.y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = player.color;
};

function App() {
  const [players, setPlayers] = useState<PlayerOnBoard[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dragstarted = (
    event: D3DragEvent<DraggedElementBaseType, null, PlayerOnBoard>
  ) => {
    const playersCopy: PlayerOnBoard[] = [...players];
    setPlayers([...playersCopy].splice(players.indexOf(event.subject), 1));
    setPlayers([...players, event.subject]);
  };

  const drag = drag()
    .subject(dragsubject)
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx?.clearRect(0, 0, window.innerHeight, window.innerWidth);
    players.forEach((player) => draw(ctx, player));
  });

  return (
    <div className="border-solid rounded border-r-4 border-gray-300">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={(e) => {
          const newPlayer = { x: e.clientX, y: e.clientY };
          setPlayers([...players, newPlayer]);
        }}
      />
    </div>
  );
}

export default App;
