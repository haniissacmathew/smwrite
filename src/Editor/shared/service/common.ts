export function processJson(json: any) {
  let html = "";
  if (json && json.length != 0) {
    json.forEach((item: any,index:any) => {
      if (item.text != undefined) {
        html += `<div data-id='${index}' id='${index}' class='${item.type}'>${item.text}</div>`;
        // html += `<span data-id='${index}' id='${index+index}' class='${item.type}'>${item.text}</span><br id='${index+index+1}'/>`;
      }
    });
  }
  return html;
}



