import { PlayerOnBoard } from "../types/Player";
import BoardDimensions from "../types/TacticalBoard";
import useTacticalBoardCanvas from "../hooks/useTacticalBoardCanvas";
import { useEffect } from "react";

const TacticalBoard: React.FunctionComponent<{
  playerData: PlayerOnBoard[] | null;
}> = ({ playerData }) => {
  //1. get a canvas ref for this tactical board
  //2. pass in a render function
  //3. render the players to the board

  const [canvasRef, players, setPlayers] = useTacticalBoardCanvas();

  useEffect(() => {
    setPlayers(playerData);
    return () => {
      console.log("cleaned up");
    };
  }, [playerData, setPlayers]);

  console.log("rendering Tactical Board");
  return (
    <canvas
      className="canvas"
      ref={canvasRef}
      width={800}
      height={600}
    ></canvas>
  );
};

export default TacticalBoard;
