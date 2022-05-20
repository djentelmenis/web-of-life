import { Dispatch, SetStateAction } from "react";

import ElementId from "../../constants/elementId";
import { TIMEOUT_BETWEEN_EPOCHS } from "../../constants/constants";

import type State from "../../state/state";
import updateState from "../../state/updateState";

import init from "../init/init";
import draw from "../draw/draw";

interface TickParams {
  state: State;
  previousUpdateTime: Date;
  previousFpsTime: Date;
  frame: number;
  setIsSessionInProgress: Dispatch<SetStateAction<boolean>>;
}

const tick = ({
  state,
  previousUpdateTime,
  previousFpsTime,
  frame,
  setIsSessionInProgress,
}: TickParams) => {
  if (!window.webOfLife.shouldSessionBeKilled) {
    const currentTime = new Date();
    const deltaUpdateTime =
      currentTime.getTime() - previousUpdateTime.getTime();
    const deltaFpsTime = currentTime.getTime() - previousFpsTime.getTime();

    const shouldUpdateState =
      deltaUpdateTime > window.webOfLife.options.tickInterval;
    const shouldUpdateFps = deltaFpsTime > window.webOfLife.options.fpsInterval;

    let newState = state;
    if (
      shouldUpdateState &&
      state.tick < window.webOfLife.options.epochLength
    ) {
      newState = updateState(state);

      const tickCounter = document.getElementById(ElementId.TICK);
      if (tickCounter) {
        tickCounter.innerHTML = state.tick.toString();
      }
    }

    let newFrame: number;
    if (shouldUpdateFps) {
      const fpsCounter = document.getElementById(ElementId.FPS);
      if (fpsCounter) {
        const fps = Math.round((frame / deltaFpsTime) * 1000).toString();
        fpsCounter.innerHTML = fps;
      }
      newFrame = 0;
    } else {
      newFrame = frame + 1;
    }

    draw(newState);

    if (state.tick < window.webOfLife.options.epochLength) {
      window.requestAnimationFrame(() => {
        tick({
          state: newState,
          previousUpdateTime: shouldUpdateState
            ? currentTime
            : previousUpdateTime,
          previousFpsTime: shouldUpdateFps ? currentTime : previousFpsTime,
          frame: newFrame,
          setIsSessionInProgress,
        });
      });
    } else if (state.epoch < window.webOfLife.options.numberOfEpochs - 1) {
      window.webOfLife.epochs.push(newState);
      const { graph } = window.webOfLife;

      if (graph) {
        setTimeout(() => {
          if (!window.webOfLife.shouldSessionBeKilled) {
            init({
              canvas: state.canvas,
              graph,
              epochs: [...window.webOfLife.epochs],
              setIsSessionInProgress,
            });
          }
        }, TIMEOUT_BETWEEN_EPOCHS);
      }
    } else {
      setIsSessionInProgress(false);
    }
  }
};

export default tick;
