import { useEffect, useRef, useState } from "react";
import { PlayerOnBoard } from "../types/Player";
import BoardDimensions from "../types/TacticalBoard";

export default function useTacticalBoardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [players, setPlayers] = useState<PlayerOnBoard[] | null>(null);

  useEffect(() => {
      const canvasObj = canvasRef.current;
      const ctx = canvasObj?.getContext('2d');
      if (ctx && players) renderPlayers(ctx, players);

      
  }, [players]);

  return [canvasRef, players, setPlayers] as const;

  /* const ctx = canvasRef.current?.getContext("2d");

  const render = (players: PlayerOnBoard[]) => {
    return function renderTacticalBoard(players: PlayerOnBoard[]): void {
      const radius = 16;
      if (ctx) {
        ctx.clearRect(0, 0, boardDims.width, boardDims.height);
        for (const { x, y, color } of players) {
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }
    };
  }; */


}

function renderPlayers(ctx: CanvasRenderingContext2D, players: PlayerOnBoard[]) {
    const radius = 16;

    ctx.clearRect(0, 0, 800, 600);
    for (const { x, y, color } of players) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
}

}
