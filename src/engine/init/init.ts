import {
  InputEventMessage,
  InputManager,
  Message,
  MessageManager,
  SENDER,
} from "canvas-input-manager";

import type State from "../../state/state";
import tick from "../tick/tick";
import generateHabitats from "../../habitat/generateHabitats";
import populateHabitats from "../../habitat/populateHabitats";
import generatePops from "../../pop/generatePops";

import handleCanvasClick from "./handleCanvasClick";

const init = (canvas: HTMLCanvasElement) => {
  const { population, worldSize, settlementAttemptLimit } =
    window.webOfLife.options;

  if (population > worldSize * worldSize) {
    throw "World size too small - Not enough habitats for the population";
  }

  const habitats = generateHabitats(worldSize);
  const pops = generatePops({
    population,
    habitats,
    worldSize,
    settlementAttemptLimit,
  });

  let state: State = {
    canvas,
    habitats,
    pops,
    tick: 0,
  };

  state = populateHabitats(state);

  InputManager.init(canvas);
  MessageManager.subscribe(
    InputEventMessage.MOUSE_CLICK,
    (message: Message<SENDER.INPUT_MANAGER, PointerEvent>) =>
      handleCanvasClick({ message, habitats, pops })
  );

  window.webOfLife.initialState = state;
  window.webOfLife.isSessionInProgress = true;

  const initialTime = new Date();
  tick({
    state,
    previousUpdateTime: initialTime,
    previousFpsTime: initialTime,
    frame: 0,
  });
};

export default init;
