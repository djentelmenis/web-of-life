import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Graph } from "@antv/g6";
// TODO change to regular library import when bug is fixed https://github.com/antvis/G6/issues/3284
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import G6 from "@antv/g6/dist/g6.min";

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
      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      /* eslint-disable @typescript-eslint/no-unsafe-call */
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setG6Graph(graph);
    }
  }, []);

  return <div className={classes.BrainMap} ref={canvasRef}></div>;
};

export default BrainMap;
