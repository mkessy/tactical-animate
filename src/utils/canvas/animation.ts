import { interpolate, interpolateArray } from "d3-interpolate";
import config from "../../config";
import { InterpolatedPlayer, PlayerOnBoard } from "../../types/Player";

const interpolatePlayers = (players: PlayerOnBoard[], interpolator: typeof interpolate): InterpolatedPlayer[] => {
    return players.map(p => {
      const {history, color, id} = p;
      const start = history[0];
      const end = history[history.length-1];
      return {
        id,
        interpolator: config.animation.DEFAULT_INTERPOLATOR(start, end),
        color,
      } as InterpolatedPlayer
    });
  }

export default interpolatePlayers;