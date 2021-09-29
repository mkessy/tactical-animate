import "./App.css";
import { CanvasContainer } from "./components/CanvasContainer";
import { useState } from "react";
import { PlayerOnBoard } from "./types/Player";
import { schemeCategory10, range } from "d3";
import { CanvasContainerProps } from "./types/Canvas";
import TacticalBoard from "./components/TacticalBoard";

const radius = 16;
const width = 500;
const height = 500;

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

  return (
    <div className="flex max-w-screen-lg mx-auto">
      <div className="m-3 border border-solid border-gray-600"></div>
      <div>
        <TacticalBoard
          initPlayers={initialPlayers}
          setGlobalCanvasState={setPlayers}
        />
      </div>
    </div>
  );
}

export default App;
