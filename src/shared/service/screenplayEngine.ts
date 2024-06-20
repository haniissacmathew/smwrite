export function parseTaggedString(str: string): object {
  const elements = str.split("_END_");
  let result = [];
  for (let i = 0; i < elements.length; i++) {
    const context = elements[i].split("_SPLIT_");
    if (context) {
      result.push({ index: i, type: context[0], text: context[1] });
    }
  }
  return result;
}
export function doTaggedToString(
  data: { index: number; type: string; text: string }[]
): string {
  // Sort elements by their index for proper order during string reconstruction
  data.sort((a, b) => a.index - b.index);

  let result = "";
  for (const element of data) {
    // Concatenate each element with the appropriate delimiters
    if (element.text != undefined) {
      result += element.type + "_SPLIT_" + element.text + "_END_";
    }
  }

  // Remove the trailing delimiter from the reconstructed string
  return result.slice(0, -5);
}