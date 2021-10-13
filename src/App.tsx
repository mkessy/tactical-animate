import "./App.css";
import { useState } from "react";
import { PlayerOnBoard } from "./types/Player";
import { schemeCategory10 } from "d3";
import config from "./config";
import TacticalBoard from "./components/TacticalBoard";
import { AnimatedCanvasFrame } from "./components/AnimatedCanvasFrame";
import { squad } from "./test_data/TestApiResponse";
import PlayerOnBoardList from "./components/PlayerOnBoardList";
import { Box, Container, Grid } from "@mui/material";
import { Tab } from "@headlessui/react";
import AlignItemsList from "./components/AlignItemsList";

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
  const [players, setPlayers] = useState<PlayerOnBoard[]>(
    initialPlayers.slice(0, 10)
  );
  const [animate, setAnimate] = useState<boolean>(false);

  return (
    <Container sx={{ width: 1200 }}>
      <Grid container>
        <Grid item xs={12}>
          ANIMATE FRAMES
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={8}>
            <TacticalBoard
              initPlayers={players}
              setGlobalCanvasState={setPlayers}
            />
          </Grid>
          <Grid item xs={4}>
            <AlignItemsList players={players} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
