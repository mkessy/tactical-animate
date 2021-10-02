import "./App.css";
import { useState } from "react";
import { PlayerOnBoard } from "./types/Player";
import { schemeCategory10, range } from "d3";
import config from "./config";
import TacticalBoard from "./components/TacticalBoard";
import { AnimatedCanvasFrame } from "./components/AnimatedCanvasFrame";
import { squad } from "./test_data/squad";
import PlayerOnBoardList from "./components/PlayerOnBoardList";

const { HEIGHT, WIDTH, RADIUS } = config.canvas;

interface ApiPlayer {
  id: number;
  name: string;
  age: number;
  number: number | null;
  position: string;
  photo: string;
}

const players: ApiPlayer[] = squad.response[0].players;

const initialPlayers: PlayerOnBoard[] = players.map((p, i) => {
  const x = Math.random() * (WIDTH - RADIUS * 2) + RADIUS;
  const y = Math.random() * (HEIGHT - RADIUS * 2) + RADIUS;

  const { id, name, age, number, position, photo } = p;

  return {
    id,
    name,
    age,
    number: number ? number : null,
    position,
    photoUrl: photo,
    x,
    y,
    color: schemeCategory10[3],
    active: false,
    history: [[x, y]],
    draggable: true,
  };
});

function App() {
  const [players, setPlayers] = useState<PlayerOnBoard[]>(initialPlayers);
  const [animate, setAnimate] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => {
          setAnimate(!animate);
        }}
      >
        Animate
      </button>
      <div className="max-w-screen-lg mx-auto mt-12">
        <div className="mx-3 border-2 rounded border-solid h-40 flex-row border-gray-600">
          <div className=""></div>
        </div>
        <div className="flex">
          <div className="m-3 border-4 border-opacity-50 rounded border-solid border-gray-600">
            {animate ? (
              <AnimatedCanvasFrame players={players} />
            ) : (
              <TacticalBoard
                initPlayers={initialPlayers}
                setGlobalCanvasState={setPlayers}
              />
            )}
          </div>
          <div className="border-2 rounded border-solid border-gray-600 flex-grow m-3">
            <PlayerOnBoardList players={players} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
