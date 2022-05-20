import { Options } from "../types";

const InitialOptions: Options = {
  worldSize: 32,
  population: 124,
  settlementAttemptLimit: 1000,
  tickInterval: 250,
  fpsInterval: 1000,
  epochLength: 150,
  numberOfEpochs: 30,
  numberOfMiddleNeurons: 3,
  numberOfSynapses: 6,
  allowReproduction: true,
};

export default InitialOptions;
