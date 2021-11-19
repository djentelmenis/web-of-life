import type Pop from "../pop/pop";

interface Habitat {
  id: string;
  row: number;
  column: number;
  inhabitant: null | Pop;
}

export default Habitat;
