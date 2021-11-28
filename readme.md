# Web of Life

## [Live Demo](https://web-of-life.netlify.app/)

Game of life like program to simulate `pops` with `neural networks` occupying `habitats`

![Screenshot](screenshot.gif)

## Features

- Generates `habitat` squares and their inhabiting `pops`
- Generates a `neural network` brain for each `pop` with:
  - Sensory input `neurons`
  - Hidden middle layer `neurons`
  - Output action `neurons`
  - `Synapses` between the `neurons` with random weight values
- Visualizes the selected `pops` brain as a layered graph
  - Select a `pop` by left clicking on it after the simulation has begun
- Runs the `simulation` where on each tick `pops`:
  - Fire `synapses` through input `neurons`
  - Execute an action corresponding to the output `neuron` with the highest value
- Current input `neurons`:
  - Oscilloscope
  - Is up free
  - Is down free
  - Is left free
  - Is right free
  - Latitude
  - Longitude
  - Age
  - Random
- Current action `neurons`:
  - Wait
  - Move up
  - Move down
  - Move left
  - Move right
- Configurable initial simulation parameters:
  - World parameters:
    - World size
    - Initial population
    - Epoch length (number of ticks to simulate)
  - Pop parameters:
    - Number of middle `neurons` in hidden `neuron` layer
    - Number of `synapses` (connections) between `neurons`
- Configurable settings:
  - Time interval between ticks (0 will update the simulation on each frame)
- Reports simulation status:
  - Actual rendered FPS (Updates interval 1 second)
  - Current epoch tick (Updates interval each tick)

### Technical

- Written in `TypeScript`
- Uses `React` and `sass` for the UI elements
- Renders the simulation in `<canvas />` component
- Experimented writing the simulation and rendering engine with functional programming
- Renders the `neural network` with [G6](https://g6.antv.vision/en) graph visualization library

## Development

- clone this repo
- install npm packages - `yarn`
- run locally - `yarn dev`

## License

- MIT
