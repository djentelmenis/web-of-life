import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import G6, { Graph } from "@antv/g6";

import { calculateBrainMapSize } from "../../utils";

import classes from "./BrainMap.module.scss";

interface BrainMapProps {
  g6Graph: Graph | null;
  setG6Graph: Dispatch<SetStateAction<Graph | null>>;
}

const BrainMap: FunctionComponent<BrainMapProps> = ({
  g6Graph,
  setG6Graph,
}: BrainMapProps) => {
  const [canvasSize, setCanvasSize] = useState(calculateBrainMapSize());

  const canvasRef = useRef<HTMLDivElement>(null);

  const onResize = () => {
    setCanvasSize(calculateBrainMapSize());
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (g6Graph) {
      g6Graph.changeSize(canvasSize, canvasSize);
    }
  }, [canvasSize]);

  useEffect(() => {
    if (canvasRef.current) {
      const graph = new G6.Graph({
        container: canvasRef.current,
        width: canvasSize,
        height: canvasSize,
        fitView: true,
        modes: {
          default: ["drag-node"],
        },
        defaultNode: {
          type: "circle",
          size: 50,
          style: {
            stroke: "white",
            lineWidth: 3,
          },
          labelCfg: {
            style: {
              fontSize: 24,
              fill: "white",
              fontWeight: 500,
            },
          },
        },
        defaultEdge: {
          type: "cubic-vertical",
          size: 2,
          style: {
            endArrow: {
              path: "M 0,0 L 8,4 L 8,-4 Z",
            },
          },
          labelCfg: {
            position: "center",
            style: {
              fontSize: 24,
              fill: "white",
              fontWeight: 500,
              background: {
                fill: "#000000",
                stroke: "#9EC9FF",
                padding: [4, 4, 4, 4],
                radius: 2,
              },
            },
          },
        },
      });
      window.webOfLife.graph = graph;
      setG6Graph(graph);
    }
  }, []);

  return <div className={classes.BrainMap} ref={canvasRef}></div>;
};

export default BrainMap;
