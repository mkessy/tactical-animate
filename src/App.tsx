import React, { DragEvent, MouseEvent, SyntheticEvent, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import TacticalBoard from "./components/TacticalBoard";
import { useEffect, useState } from "react";
import { PlayerOnBoard } from "./types/Player";
import { fetchPlayerData } from "./utils/fetchPlayerData";
import {
  schemeCategory10,
  range,
  select,
  drag,
  D3DragEvent,
  DraggedElementBaseType,
} from "d3";
import { isContext } from "vm";

const radius = 16;
const width = 500;
const height = 500;

//const initialPlayers = require("./testPlayers.json");

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

const initialPlayers: PlayerOnBoard[] = range(20).map((i) => ({
  id: i,
  x: Math.random() * (width - radius * 2) + radius,
  y: Math.random() * (height - radius * 2) + radius,
  color: schemeCategory10[i % 10],
}));

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
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasContainer = select(canvasContainerRef.current)
      .append("canvas")
      .attr("width", 500)
      .attr("height", 500);

    const dragsubject = (
      event: D3DragEvent<HTMLCanvasElement, unknown, unknown>
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
      return subject;
    };

    const canvasDrag = drag<HTMLCanvasElement, unknown, unknown>()
      .subject(dragsubject)
      .on("start", (e) => {
        console.error(
          "drag started near: " + e.subject.id + " " + e.subject.color
        );
      })
      .on("drag", (e) => console.error("dragged"))
      .on("end", (e) => {
        console.error("drag ended near" + e.subject.id + " " + e.subject.color);
      });
    canvasContainer.call(canvasDrag);

    const ctx = canvasContainer.node()?.getContext("2d");

    players.forEach((p, i) => {
      if (ctx) {
        draw(ctx, p);
      }
    });
  }, [players]);

  console.log("Rendering canvas");

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="m-3 border border-solid border-gray-600">
        <div className="canvas-container" ref={canvasContainerRef}></div>
      </div>
    </div>
  );
}

export default App;
