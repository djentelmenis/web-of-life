import type Habitat from "../habitat/habitat";
import type { Brain, OutputNeuronType } from "./neurons/neurons";

interface Pop {
  id: string;
  habitat: Habitat;
  action: OutputNeuronType;
  color: number;
  brain: Brain;
}

export default Pop;
