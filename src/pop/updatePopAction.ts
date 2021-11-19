import { generateRandomInteger, getEnumValues } from "../utils";
import type Pop from "./pop";
import { PopAction } from "./pop";

interface UpdatePopActionParams {
  pop: Pop;
}

const updatePopAction = ({ pop }: UpdatePopActionParams) => {
  const popActionValues = getEnumValues(PopAction);
  const max = popActionValues.length;
  const newAction =
    popActionValues[
      generateRandomInteger({
        max,
      })
    ];
  pop.action = newAction;
};

export default updatePopAction;
