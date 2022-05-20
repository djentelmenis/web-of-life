import type { Graph } from "@antv/g6";
import State from "./state/state";

export interface Options {
  worldSize: number;
  population: number;
  settlementAttemptLimit: number;
  tickInterval: number;
  fpsInterval: number;
  epochLength: number;
  numberOfEpochs: number;
  numberOfMiddleNeurons: number;
  numberOfSynapses: number;
  allowReproduction: boolean;
}

export interface WebOfLife {
  options: Options;
  initialState: State | null;
  epochs: State[];
  shouldSessionBeKilled: boolean;
  isSessionInProgress: boolean;
  graph: Graph | null;
}

declare global {
  interface Window {
    webOfLife: WebOfLife;
  }
}
