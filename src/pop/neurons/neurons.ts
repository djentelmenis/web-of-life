export enum InputNeuronType {
  OSCILLOSCOPE = "oscilloscope",
  IS_UP_FREE = "isUpFree",
  IS_DOWN_FREE = "isDownFree",
  IS_LEFT_FREE = "isLeftFree",
  IS_RIGHT_FREE = "isRightFree",
  LATITUDE = "latitude",
  LONGITUDE = "longitude",
  AGE = "age",
  RANDOM = "random",
}

export enum OutputNeuronType {
  WAIT = "wait",
  MOVE_UP = "moveUp",
  MOVE_DOWN = "moveDown",
  MOVE_LEFT = "moveLeft",
  MOVE_RIGHT = "moveRight",
}

export enum MiddleNeuronType {
  MIDDLE_NEURON = "middleNeuron",
}

export interface Synapse {
  source: null | Neuron;
  target: null | Neuron;
  weight: number;
}

export interface Neuron {
  id: string;
  type: InputNeuronType | OutputNeuronType | MiddleNeuronType;
  value: number;
  synapse: Synapse;
}

export interface InputNeuron extends Neuron {
  type: InputNeuronType;
}

export interface OutputNeuron extends Neuron {
  type: OutputNeuronType;
}

export interface MiddleNeuron extends Neuron {
  type: MiddleNeuronType;
}

export interface Brain {
  inputNeurons: InputNeuron[];
  outputNeurons: OutputNeuron[];
  middleNeurons: MiddleNeuron[];
}
