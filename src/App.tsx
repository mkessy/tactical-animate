import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TacticalBoard from "./components/TacticalBoard";
import { useEffect, useState } from "react";
import { PlayerOnBoard } from "./types/Player";
import { fetchPlayerData } from "./utils/fetchPlayerData";

function App() {
  const [players, setPlayers] = useState<PlayerOnBoard[] | null>(() => []);

  useEffect(() => {
    fetchPlayerData<PlayerOnBoard[]>("./testPlayers.json")
      .then((data) => {
        setPlayers(data);
      })
      .catch((error) => console.error(error));

    return () => {
      console.log("cleaned up");
    };
  }, [setPlayers]);

  return (
    <div className="text-center text-3xl mx-auto max-w-screen-sm">
      Hello Tailwind is online!
      <TacticalBoard playerData={players} />
    </div>
  );
}

export default App;
