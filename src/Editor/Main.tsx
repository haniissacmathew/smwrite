import "./Main.css";
import {useSelector,useDispatch} from 'react-redux';
import {selectScreenplay,updateByIndex} from  '../store/editorSlice';
import {processJson} from './shared/service/common';
import { useEffect, useState } from "react";
function Main() {
  const [html, setHtml] = useState('<p>Editable content here</p>');
  const screenplay=useSelector(selectScreenplay);
  const dispatch=useDispatch();
  useEffect(() => {
    setHtml(processJson(screenplay));
  },[screenplay]);
  const handleInputChange = (e:any) => {
    console.log(e.target.id);
    const body:any={index:e.target.id,content:e.target.innerHTML};
    dispatch(updateByIndex(body));
    // setHtml(e.target.innerHTML);
  };
  const handleKeyDown = (e:any) => {
    const targetElement = e.target;
    console.log(e.currentTarget)
    console.log(targetElement);
  // Check if the target element has an id
  if (targetElement.id) {
    console.log("ID of the element:", targetElement.id);
    // You can use the ID for further processing
  } else {
    console.log("The element does not have an ID.");
  }
    if (e.key === 'Enter') {
      e.preventDefault();
      // Create a new <br> element
      const br = document.createElement('br');

      // Get the current selection
      const selection:any = window.getSelection();
      const range = selection.getRangeAt(0);

      // Insert the <br> element at the current selection
      range.insertNode(br);

      // Move the caret to the right position
      range.setStartAfter(br);
      range.setEndAfter(br);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  return (
    <div className="editable-container">
      {screenplay.map((htmlCode:any, index:any) => (
        <div id={htmlCode.index} contentEditable="true" className="editable" key={index} dangerouslySetInnerHTML={{ __html: htmlCode.text }} onInput={handleInputChange}/>
      ))}

    </div>
  );
}

export default Main;
