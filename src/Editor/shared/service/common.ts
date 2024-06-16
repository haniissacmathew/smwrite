export function processJson(json: any) {
  let html = "";
  if (json && json.length != 0) {
    json.forEach((item: any) => {
      if (item.text != undefined) {
        html += `<span id='${item.index}' class='${item.type}'>${item.text}</span><br/>`;
      }
    });
  }
  return html;
}
