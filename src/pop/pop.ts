import type Habitat from "../habitat/habitat";

export enum PopAction {
  WAIT,
  MOVE_UP,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
}

interface Pop {
  id: string;
  habitat: Habitat;
  action: PopAction;
  color: number;
}

export default Pop;
