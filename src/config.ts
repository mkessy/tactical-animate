//config files for Tactiacl Animate

import { interpolate } from "d3-interpolate";

//canvas
const config = {
  canvas: {
    WIDTH: 675,
    HEIGHT: 675 * 0.76923077,
    RADIUS: 12,
  },

  animation: {
    DEFAULT_INTERPOLATOR: interpolate,
    DURATION: 2000, // animation duration in ms
  },

  football: {
    //pitch dimensions calculation
    //see fifa_official_pitch_dimensions.jpeg
    //all dimensions normalized based on maximum sideline length

    pitchDimensions: [
      {
        name: "PITCH",
        startingPoint: [0, 0],
        length: 1,
        height: 0.76923077,
        shape: "rect",
      },

      {
        name: "YARD18_BOX",
        startingPoint: [0, 0.21538462],
        length: 0.13846154,
        height: 0.33846154,
        shape: "rect",
      },

      {
        name: "GOAL_BOX",
        startingPoint: [0, 0.32307692],
        length: 0.04615385,
        height: 0.09230769,
        shape: "rect",
      },

      {
        name: "CENTER_LINE",
        startingPoint: [0.5, 0],
        endingPoint: [0.5, 0.76923077],
        shape: "line",
      },

      {
        name: "CENTER_CIRCLE",
        startingPoint: [0.5, 0.38461538],
        radius: 0.07692308,
        shape: "circle",
      },
    ],
  },
};

export default config;
