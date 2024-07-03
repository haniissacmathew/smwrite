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
export function processSceneheadings(json: any) {
  let sceneList:any = [];
  if (json && json.length != 0) {
    json.forEach((item: any) => { 
      if (item.type.trim() === "scene") { 
        let text=item.text.replace("&nbsp;", "");
        sceneList.push({text:text,type:item.type});
      }
    });
  }
  return sceneList;
}

export function processCharacter(json: any) {
  let charList:any = [];
  if (json && json.length != 0) {
    json.forEach((item: any) => {
      if (item.type.trim() === "character") { 
        let text=item.text.replace("&nbsp;", "");
        if(!charList.find((f:any)=>f.text==text)){
          charList.push({text:text,type:item.type});
        }
      }
    });
  }
  return charList;
}
