import React, {
  DragEvent,
  MouseEvent,
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
} from "react";
import logo from "./logo.svg";
import "./App.css";
import { CanvasContainer } from "./components/TacticalBoard";
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

const radius = 16;
const width = 500;
const height = 500;

type CanvasContainerProps = {
  playerData: PlayerOnBoard[];
  setPlayerData: (players: PlayerOnBoard[]) => void;
};

const initialPlayers: PlayerOnBoard[] = range(20).map((v, i) => {
  const x = Math.random() * (width - radius * 2) + radius;
  const y = Math.random() * (height - radius * 2) + radius;

  return {
    id: i,
    x,
    y,
    color: schemeCategory10[i % 10],
    active: false,
    history: [[x, y]],
    draggable: true,
  };
});

function App() {
  const [players, setPlayers] = useState<PlayerOnBoard[]>(initialPlayers);

  const onDragPlayer = (players: PlayerOnBoard[]) => {
    setPlayers(players);
  };

  return (
    <div className="flex max-w-screen-lg mx-auto">
      <div className="m-3 border border-solid border-gray-600">
        <CanvasContainer
          setPlayerData={onDragPlayer}
          playerData={initialPlayers}
        />
      </div>
      <div>
        <ul>
          {players
            .sort((a, b) => a.id - b.id)
            .map((p) => {
              return (
                <li key={p.id}>
                  <span
                    className={
                      (p.active ? "bg-green-300" : "") +
                      (!p.draggable ? "bg-red-300" : "")
                    }
                  >
                    {p.id} --- {p.x.toFixed(0)},{p.y.toFixed(0)} |{" "}
                    {p.history
                      .map(([x, y]) => [x.toFixed(), y.toFixed()].join(","))
                      .join(" ")}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
