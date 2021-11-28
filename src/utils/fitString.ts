// TODO change to regular library import when bug is fixed https://github.com/antvis/G6/issues/3284
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import G6 from "@antv/g6/dist/g6.min";

import { ELLIPSIS } from "../constants/constants";
import { NEWLINE } from "../constants/regex";

export const getLetterWidth = (letter: string, fontSize: number): number =>
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/no-unsafe-call */
  G6.Util.getLetterWidth(letter, fontSize) as number;
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-call */

/**
 * Creates line brakes for a given strings that exceed a given with
 *
 * @param {string} str The original string
 * @param {number} maxWidth The maximum width allowed
 * @param {number} fontSize The font size
 * @param {number} maxLines The maximum number of lines allowed
 * @return {*} {string} The resulting formatted string
 */
const fitString = (
  str: string,
  maxWidth: number,
  fontSize: number,
  maxLines?: number,
  keepWhitespace?: boolean
): string => {
  const trimmedString = keepWhitespace ? str : str.trim().replace(NEWLINE, "");
  let res = trimmedString;
  let currentChar = "";
  let currentWidth = 0;
  let currentLine = 0;

  for (let i = 0; i < trimmedString.length; i += 1) {
    currentChar = trimmedString[i];
    currentWidth += getLetterWidth(currentChar, fontSize);

    if (currentWidth > maxWidth) {
      if (maxLines && currentLine === maxLines - 1) {
        res = `${res.substr(0, i - ELLIPSIS.length)}${ELLIPSIS}`;
        break;
      }

      // Finds the previous space between words to avoid word splitting
      for (let j = i; j > 0; j -= 1) {
        const previousChar = res[j];
        if (previousChar === " ") {
          // Adds the line-break and removes leading/trailing spaces
          res = `${res.substr(0, j).trimRight()}\n${res.substr(j).trimLeft()}`;
          currentWidth = 0;
          currentLine += 1;
          // Resets the line length counter to the begging of the new line
          i = j;
          break;
        }
      }
    }
  }

  return res;
};

export default fitString;
