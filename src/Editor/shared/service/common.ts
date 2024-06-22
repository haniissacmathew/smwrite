export function processJson(json: any) {
  let html = "";
  if (json && json.length != 0) {
    json.forEach((item: any,index:any) => {
      if (item.text != undefined) {
        html += `<span data-id='${index}' id='${index+index}' class='${item.type}'>${item.text}</span><br id='${index+index+1}'/>`;
      }
    });
  }
  return html;
}



