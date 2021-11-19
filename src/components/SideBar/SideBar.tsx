import { ChangeEvent, FunctionComponent, useState } from "react";

import ElementId from "../../constants/elementId";

import classes from "./SideBar.module.scss";
import init from "../../engine/init/init";

const SideBar: FunctionComponent = () => {
  const [isSessionInProgress, setIsSessionInProgress] = useState(false);
  const [worldSize, setWorldSize] = useState(
    window.webOfLife.options.worldSize
  );
  const [population, setPopulation] = useState(
    window.webOfLife.options.population
  );
  const [tickInterval, setTickInterval] = useState(
    window.webOfLife.options.tickInterval
  );

  const handleStart = () => {
    window.webOfLife.shouldSessionBeKilled = false;
    setIsSessionInProgress(true);
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
      init(canvas);
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

  const handleTickIntervalChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    window.webOfLife.options.tickInterval = value;
    setTickInterval(value);
  };

  return (
    <div className={classes.SideBar}>
      <h1>Web of Life</h1>
      <button onClick={handleStart} disabled={isSessionInProgress}>
        Start!
      </button>
      <button onClick={handleEnd} disabled={!isSessionInProgress}>
        End!
      </button>
      <div className={classes.Group}>
        <h2>Initial parameters</h2>
        <div>
          <div>
            <span>World size - </span>
            <span>{worldSize}</span>
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
            <div>
              <input
                onChange={handlePopulationChange}
                type="range"
                min={1}
                max={worldSize * worldSize}
                step={1}
                value={population}
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
        </div>
      </div>
    </div>
  );
};

export default SideBar;