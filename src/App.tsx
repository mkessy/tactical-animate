import React, { DragEvent, MouseEvent, SyntheticEvent, useRef } from "react";
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
import { isContext } from "vm";

const radius = 16;
const width = 500;
const height = 500;

const initialPlayers = require("./testPlayers.json");

const draw = (ctx: CanvasRenderingContext2D | null, player: PlayerOnBoard) => {
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(player.x + radius, player.y);
    ctx.arc(player.x, player.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
  }
};

const pointer = (event: MouseEvent) => {
  const node = event.currentTarget;
  const rect = node.getBoundingClientRect();

  if (rect) {
    return [
      event.clientX - rect.left - node.clientLeft,
      event.clientY - rect.top - node.clientTop,
    ];
  }
  return [event.pageX, event.pageY];
};

function App() {
  const [players, setPlayers] = useState<PlayerOnBoard[]>(initialPlayers);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    players.forEach((player, i) => {
      if (ctx) draw(ctx, player);
    });
  }, [players]);

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

  const dragstarted = (event: DragEvent) => {
    console.debug(event.clientX + ", " + event.clientY);
  };

  //need to be clever about how we change the state here...
  //we should probably store the players by id. then i can easily
  const dragged = (event: DragEvent) => {
    console.debug(event.clientX + ", " + event.clientY);
  };

  const dragended = (event: DragEvent) => {
    console.debug(event.clientX + ", " + event.clientY);
  };

  /* const canvasDrag = drag<HTMLCanvasElement, unknown, unknown>()
    .subject(dragsubject)
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended); */

  console.log("Rendering canvas");

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="m-3 border border-solid border-gray-600">
        <div>
          <canvas
            className="my-4 mx-auto border border-dashed border-gray-300"
            ref={canvasRef}
            draggable
            onDragStart={(e) => {
              const [x, y] = pointer(e);
              console.error("drag started: " + x, +" " + y);
            }}
            onDrag={() => console.log("dragging")}
            onDragEnd={(e) => {
              const [x, y] = pointer(e);
              console.error("drag ended: " + x, +" " + y);
            }}
            onClick={() => console.log("clicked")}
            onDoubleClick={() => console.log("double clicked")}
            width={width}
            height={height}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
