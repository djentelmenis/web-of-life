import type { Graph } from "@antv/g6";
import State from "./state/state";

export interface Options {
  worldSize: number;
  population: number;
  settlementAttemptLimit: number;
  tickInterval: number;
  fpsInterval: number;
  epochLength: number;
  numberOfMiddleNeurons: number;
  numberOfSynapses: number;
}

export interface WebOfLife {
  options: Options;
  initialState: State | null;
  shouldSessionBeKilled: boolean;
  isSessionInProgress: boolean;
  graph: Graph | null;
}

declare global {
  interface Window {
    webOfLife: WebOfLife;
  }
}
