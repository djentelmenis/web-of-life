import type { GraphData } from "@antv/g6";
import type { Brain } from "../../../pop/neurons/neurons";

import getGraphNodesFromBrain from "./getGraphNodesFromBrain";
import getGraphEdgesFromBrain from "./getGraphEdgesFromBrain";

const getGraphFromBrain = (brain: Brain): GraphData => ({
  nodes: getGraphNodesFromBrain(brain),
  edges: getGraphEdgesFromBrain(brain),
});

export default getGraphFromBrain;
