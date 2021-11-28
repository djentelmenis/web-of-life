import { fitString } from "../../../utils";

const getNeuronLabel = (label: string) =>
  fitString(label.replace(/([A-Z])/g, " $1").toLowerCase(), 100, 24);

export default getNeuronLabel;
