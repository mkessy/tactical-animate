//config files for Tactiacl Animate

import { interpolate } from "d3-interpolate";


//canvas
const config = {

    canvas: {
        WIDTH: 800,
        HEIGHT: 600,
        RADIUS: 16,
    },

    animation: {
        DEFAULT_INTERPOLATOR: interpolate,
    },

    football: {
        //pitch dimensions calculation
        //see fifa_official_pitch_dimensions.jpeg
        //all dimensions normalized based on maximum sideline length

        pitchDimensions: {
            PITCH: {
                starting_point: [0, 0],
                length: 1,
                width: 0.76923077,
                shape: 'rect'
            },

            YARD18_BOX: {
                starting_point: [0, 0.21538462],
                length: 0.13846154,
                width: 0.33846154,
                shape: 'rect'
            },

            GOAL_BOX: {
                starting_point: [0, 0.30769231],
                length: 0.04615385 ,
                width: 0.09230769,
                shape: 'rect'
            },

            GOAL: {
                startingPoint: [0],
                width: 0.06153846,
                shape: 'rect'
            },
            //distance from center of goal to pen stop, 12 yards
            /* PEN_SPOT: {
                length: 0.09230769,
                shape: 'circle'
            },
 */
            CENTER_CIRCLE: {
                startingPoint: [0.5, 0.38461538],
                radius: 0.07692308,
                shape: 'circle'
            },

        }
    }

}

export default config;



