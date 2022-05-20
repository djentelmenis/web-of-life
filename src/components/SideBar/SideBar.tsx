import { Graph } from "@antv/g6";
import { ChangeEvent, FunctionComponent, useState } from "react";

import ElementId from "../../constants/elementId";
import init from "../../engine/init/init";

import classes from "./SideBar.module.scss";

interface SideBarProps {
  g6Graph: Graph | null;
  gameBoard: HTMLCanvasElement | null;
}

const SideBar: FunctionComponent<SideBarProps> = ({
  g6Graph,
  gameBoard,
}: SideBarProps) => {
  const [isSessionInProgress, setIsSessionInProgress] = useState(false);
  const [worldSize, setWorldSize] = useState(
    window.webOfLife.options.worldSize
  );
  const [population, setPopulation] = useState(
    window.webOfLife.options.population
  );
  const [epochLength, setEpochLength] = useState(
    window.webOfLife.options.epochLength
  );
  const [numberOfEpochs, setNumberOfEpochs] = useState(
    window.webOfLife.options.numberOfEpochs
  );
  const [numberOfMiddleNeurons, setNumberOfMiddleNeurons] = useState(
    window.webOfLife.options.numberOfMiddleNeurons
  );
  const [numberOfSynapses, setNumberOfSynapses] = useState(
    window.webOfLife.options.numberOfSynapses
  );
  const [allowReproduction, setAllowReproduction] = useState(
    window.webOfLife.options.allowReproduction
  );
  const [tickInterval, setTickInterval] = useState(
    window.webOfLife.options.tickInterval
  );

  const handleStart = () => {
    window.webOfLife.shouldSessionBeKilled = false;
    setIsSessionInProgress(true);

    if (gameBoard && g6Graph) {
      window.webOfLife.epochs = [];
      init({
        canvas: gameBoard,
        graph: g6Graph,
        epochs: [],
        setIsSessionInProgress,
      });
    }
  };

  const handleEnd = () => {
    window.webOfLife.shouldSessionBeKilled = true;
    setIsSessionInProgress(false);
  };

  const handleWorldSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    window.webOfLife.options.worldSize = value;
    setWorldSize(value);

    if (population > value * value) {
      setPopulation(value * value);
      window.webOfLife.options.population = value * value;
    }
  };

  const handlePopulationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    window.webOfLife.options.population = value;
    setPopulation(value);
  };

  const handleEpochLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    window.webOfLife.options.epochLength = value;
    setEpochLength(value);
  };

  const handleNumberOfEpochChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    window.webOfLife.options.numberOfEpochs = value;
    setNumberOfEpochs(value);
  };

  const handleNumberOfMiddleNeuronsChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    window.webOfLife.options.numberOfMiddleNeurons = value;
    setNumberOfMiddleNeurons(value);
  };

  const handleNumberOfSynapsesChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    window.webOfLife.options.numberOfSynapses = value;
    setNumberOfSynapses(value);
  };

  const handleAllowReproductionChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    window.webOfLife.options.allowReproduction = checked;
    setAllowReproduction(checked);
  };

  const handleTickIntervalChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    window.webOfLife.options.tickInterval = value;
    setTickInterval(value);
  };

  return (
    <div className={classes.SideBar}>
      <h1>Web of Life</h1>

      <button onClick={handleStart} disabled={isSessionInProgress || !g6Graph}>
        Start!
      </button>
      <button onClick={handleEnd} disabled={!isSessionInProgress}>
        End!
      </button>

      <div className={classes.Group}>
        <h2>World parameters</h2>
        <div>
          <div>
            <span>World size - </span>
            <span>{worldSize}</span>
            <span> habitats</span>
            <div>
              <input
                onChange={handleWorldSizeChange}
                type="range"
                min={8}
                max={512}
                step={8}
                value={worldSize}
                disabled={isSessionInProgress}
              />
            </div>
          </div>
          <div>
            <span>Initial population - </span>
            <span>{population}</span>
            <span> pops</span>
            <div>
              <input
                onChange={handlePopulationChange}
                type="range"
                min={1}
                max={worldSize * worldSize}
                value={population}
                disabled={isSessionInProgress}
              />
            </div>
          </div>
          <div>
            <span>Epoch length - </span>
            <span>{epochLength}</span>
            <span> ticks</span>
            <div>
              <input
                onChange={handleEpochLengthChange}
                type="range"
                min={10}
                max={1000}
                value={epochLength}
                disabled={isSessionInProgress}
              />
            </div>
          </div>
          <div>
            <span>Number of epochs - </span>
            <span>{numberOfEpochs}</span>
            <div>
              <input
                onChange={handleNumberOfEpochChange}
                type="range"
                min={1}
                max={100}
                value={numberOfEpochs}
                disabled={isSessionInProgress}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={classes.Group}>
        <h2>Pop parameters</h2>
        <div>
          <div>
            <span>Middle neurons - </span>
            <span>{numberOfMiddleNeurons}</span>
            <div>
              <input
                onChange={handleNumberOfMiddleNeuronsChange}
                type="range"
                min={0}
                max={40}
                value={numberOfMiddleNeurons}
                disabled={isSessionInProgress}
              />
            </div>
          </div>
          <div>
            <span>Synapses - </span>
            <span>{numberOfSynapses}</span>
            <div>
              <input
                onChange={handleNumberOfSynapsesChange}
                type="range"
                min={1}
                max={100}
                value={numberOfSynapses}
                disabled={isSessionInProgress}
              />
            </div>
          </div>
          <div>
            <span>Allow reproduction</span>
            <div>
              <input
                onChange={handleAllowReproductionChange}
                type="checkbox"
                checked={allowReproduction}
                disabled={isSessionInProgress}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={classes.Group}>
        <h2>Active settings</h2>
        <div>
          <div>
            <span>Tick interval - </span>
            <span>{tickInterval}</span>
            <span> MS </span>
            <div>
              <input
                onChange={handleTickIntervalChange}
                type="range"
                min={0}
                max={1000}
                step={1}
                value={tickInterval}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.Group}>
        <h2>Status</h2>
        <div>
          <div>
            <span>FPS - </span>
            <span id={ElementId.FPS} />
          </div>
          <div>
            <span>Tick - </span>
            <span id={ElementId.TICK} />
          </div>
          <div>
            <span>Epoch - </span>
            <span id={ElementId.EPOCH} />
          </div>
          <div>
            <span>Culled in epoch - </span>
            <span id={ElementId.CULLED_IN_EPOCH} />
          </div>
          <div>
            <span>Survivor rate - </span>
            <span id={ElementId.SURVIVOR_RATE} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
