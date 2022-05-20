import { Options } from "../types";

const InitialOptions: Options = {
  worldSize: 32,
  population: 64,
  settlementAttemptLimit: 1000,
  tickInterval: 500,
  fpsInterval: 1000,
  epochLength: 300,
  numberOfMiddleNeurons: 3,
  numberOfSynapses: 6,
};

export default InitialOptions;
