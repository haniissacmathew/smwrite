
import { useDispatch } from 'react-redux';
import {saveScreenplay} from '../store/editorSlice';
export function parseTaggedString(str: string): object {
  const elements = str.split("_END_");
  let result = [];
  for (let i = 0; i < elements.length; i++) {
    const context = elements[i].split("_SPLIT_");
    if (context && context[1] != undefined) {
      result.push({type: context[0].replace(/\n/g, ''), text: context[1].replace(/\n/g, '') });
    }
  }
  return result;
}
export function doTaggedToString(
  data: { index: number; type: string; text: string }[]
): string {
  // Sort elements by their index for proper order during string reconstruction
  // data.sort((a, b) => a.index - b.index);

  let result = "";
  for (const element of data) {
    // Concatenate each element with the appropriate delimiters
    if (element.text != undefined) {
      result += '\n'+element.type + " _SPLIT_ " + element.text + " _END_ ";
    }
  }
  // Remove the trailing delimiter from the reconstructed string
  // console.log(result)
  return result;
  // dispatch(saveScreenplay(result));
  return result.slice(0, -5);
}
