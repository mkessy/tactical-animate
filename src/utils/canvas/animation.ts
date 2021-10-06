import { interpolate, interpolateArray } from "d3-interpolate";
import config from "../../config";
import { InterpolatedPlayer, PlayerOnBoard } from "../../types/Player";

const interpolatePlayers = (
  players: PlayerOnBoard[],
  interpolator: typeof interpolate
): InterpolatedPlayer[] => {
  return players.map((p) => {
    const { history } = p;
    const start = history[history.length - 2 >= 0 ? history.length - 2 : 0];
    const end = history[history.length - 1];
    return {
      ...p,
      interpolator: config.animation.DEFAULT_INTERPOLATOR(start, end),
    } as InterpolatedPlayer;
  });
};

export default interpolatePlayers;
