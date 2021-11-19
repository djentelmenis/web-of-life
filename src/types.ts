import State from "./state/state";

export interface Options {
  worldSize: number;
  population: number;
  settlementAttemptLimit: number;
  tickInterval: number;
  fpsInterval: number;
}

export interface WebOfLife {
  options: Options;
  initialState: State | null;
  shouldSessionBeKilled: boolean;
  isSessionInProgress: boolean;
}

declare global {
  interface Window {
    webOfLife: WebOfLife;
  }
}
