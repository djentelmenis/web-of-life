import { Dispatch, SetStateAction } from "react";
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
import resettlePops from "../../pop/resettlePops";
import cullPops from "../../pop/cullPops";

import handleCanvasClick from "../handlers/handleCanvasClick";

interface initParams {
  canvas: HTMLCanvasElement;
  graph: Graph;
  epochs: State[];
  setIsSessionInProgress: Dispatch<SetStateAction<boolean>>;
}

const init = ({
  canvas,
  graph,
  epochs,
  setIsSessionInProgress,
}: initParams) => {
  const { population, worldSize, settlementAttemptLimit } =
    window.webOfLife.options;

  if (population > worldSize * worldSize) {
    throw "World size too small - Not enough habitats for the population";
  }

  const habitats = generateHabitats(worldSize);

  const previousPops = epochs.at(-1)?.pops || [];

  const survivedPops = cullPops({ pops: previousPops, worldSize });

  const resettledPops = resettlePops({
    pops: survivedPops,
    habitats,
    worldSize,
    settlementAttemptLimit,
  });

  const newPops = epochs.length
    ? []
    : generatePops({
        population,
        habitats,
        worldSize,
        settlementAttemptLimit,
      });

  const pops = [...resettledPops, ...newPops];

  let state: State = {
    canvas,
    habitats,
    pops,
    tick: 0,
    epoch: epochs.length,
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
    epochCounter.innerHTML = (state.epoch + 1).toString();
  }

  const initialTime = new Date();
  tick({
    state,
    previousUpdateTime: initialTime,
    previousFpsTime: initialTime,
    frame: 0,
    setIsSessionInProgress,
  });
};

export default init;
