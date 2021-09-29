import "./App.css";
import { useState } from "react";
import { PlayerOnBoard } from "./types/Player";
import { schemeCategory10, range } from "d3";
import config from "./config";
import TacticalBoard from "./components/TacticalBoard";
import { AnimatedCanvasFrame } from "./components/AnimatedCanvasFrame";

const { HEIGHT, WIDTH, RADIUS } = config.canvas;

const initialPlayers: PlayerOnBoard[] = range(20).map((v, i) => {
  const x = Math.random() * (WIDTH - RADIUS * 2) + RADIUS;
  const y = Math.random() * (HEIGHT - RADIUS * 2) + RADIUS;

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
  const [animate, setAnimate] = useState<boolean>(false);

  return (
    <div className="flex max-w-screen-lg mx-auto">
      <div className="m-3 border border-solid border-gray-600">
        {animate ? (
          <AnimatedCanvasFrame players={players} />
        ) : (
          <TacticalBoard
            initPlayers={initialPlayers}
            setGlobalCanvasState={setPlayers}
          />
        )}
      </div>
      <div>
        <button
          onClick={() => {
            setAnimate(!animate);
          }}
        >
          Animate
        </button>
      </div>
    </div>
  );
}

export default App;
