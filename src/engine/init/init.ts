import {
  InputEventMessage,
  InputManager,
  Message,
  MessageManager,
  SENDER,
} from "canvas-input-manager";
import type { Graph } from "@antv/g6";

import type State from "../../state/state";
import ElementId from "../../constants/elementId";
import tick from "../tick/tick";
import generateHabitats from "../../habitat/generateHabitats";
import populateHabitats from "../../habitat/populateHabitats";
import generatePops from "../../pop/generatePops";

import handleCanvasClick from "../handlers/handleCanvasClick";

const init = (canvas: HTMLCanvasElement, graph: Graph) => {
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
    epoch: 0,
  };

  state = populateHabitats(state);

  InputManager.init(canvas);
  MessageManager.subscribe(
    InputEventMessage.MOUSE_CLICK,
    (message: Message<SENDER.INPUT_MANAGER, PointerEvent>) =>
      handleCanvasClick({ message, habitats, pops, graph })
  );

  window.webOfLife.initialState = state;
  window.webOfLife.isSessionInProgress = true;

  const epochCounter = document.getElementById(ElementId.EPOCH);
  if (epochCounter) {
    epochCounter.innerHTML = state.epoch.toString();
  }

  const initialTime = new Date();
  tick({
    state,
    previousUpdateTime: initialTime,
    previousFpsTime: initialTime,
    frame: 0,
  });
};

export default init;
