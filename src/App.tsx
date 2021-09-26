import React, {
  DragEvent,
  MouseEvent,
  SyntheticEvent,
  useCallback,
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

//const initialPlayers = require("./testPlayers.json");

const initialPlayers: PlayerOnBoard[] = range(20).map((i) => ({
  id: i,
  x: Math.random() * (width - radius * 2) + radius,
  y: Math.random() * (height - radius * 2) + radius,
  color: schemeCategory10[i % 10],
}));

function App() {
  const [players, setPlayers] = useState<PlayerOnBoard[]>(initialPlayers);

  const onDragPlayer = (players: PlayerOnBoard[]) => {
    console.error(players);
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
          {players.map((p, i) => {
            return (
              <li key={p.id}>
                {p.id} --- {p.x},{p.y}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
