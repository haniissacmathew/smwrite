import "./Main.css";
import { useSelector, useDispatch } from "react-redux";
import { selectScreenplay, updateByIndex } from "../store/editorSlice";
import { processJson } from "./shared/service/common";
import { useEffect, useRef, useState } from "react";
function Main(props: any) {
  const editableRef = useRef(null);
  const [html, setHtml] = useState("<p>Editable content here</p>");
  const screenplay = useSelector(selectScreenplay);
  const dispatch = useDispatch();
  const [content, setContent] = useState(props.initialValue || "");

  useEffect(() => {
    setHtml(processJson(screenplay));
  }, [screenplay]);
  useEffect(() => {
    setCursorPositionToLastEdit();
  }, [html]);
  useEffect(() => {
    const editableNode = editableRef.current;
    const handleMutations = (mutationsList: any) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === "childList" ||
          mutation.type === "characterData"
        ) { 
          const changedSpan = mutation.target; // Get the modified span
          const changedSpanElement = changedSpan.parentElement;
          if (changedSpanElement.nodeName === "SPAN") {
            // Check for "SPAN" tag
            const body: any = {
              index: changedSpanElement.dataset.id,
              content: changedSpanElement.innerHTML,
            };
            dispatch(updateByIndex(body));
            saveCursorPosition(changedSpanElement.id);
            // ... rest of your code
          } else {
            console.log(`Changed span is not a span element.`);
          }
          // Handle the change here
        }
      }
    };

    const observer = new MutationObserver(handleMutations);

    if (editableNode) {
      observer.observe(editableNode, {
        childList: true, // observe direct children
        subtree: true, // and lower descendants too
        characterData: true, // observe content changes in text nodes
      });
    }

    // Cleanup the observer on component unmount
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  });
  const saveCursorPosition = (id: any) => {
    if (editableRef.current) {
      const selection: any = window.getSelection();
      if (selection.rangeCount > 0) {
        // console.log(selection, selection.getRangeAt(0).startOffset);
        setContent({
          ...content,
          selection: {
            offset: selection.getRangeAt(0).startOffset,
            node: id,
          },
        });
        // console.log(content);
      }
    }
  };
  const setCursorPositionToLastEdit = () => {
    if (editableRef.current && editableRef.current.childNodes) {
      const selection: any = window.getSelection();
      const range = document.createRange();
      console.log(editableRef.current.childNodes);
      // Set cursor position at index 1 (considering zero-based indexing)
      // range.setStart(editableRef.current.children[2], 1);
      // range.setEnd(editableRef.current.children[2], 1);
      console.log(content);
      if (content && content.selection && content.selection.node && content.selection.offset) {
        range.setStart(
          editableRef.current.childNodes[Number(content.selection.node)].childNodes[0],
          content.selection.offset
        );
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };
  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      // Your custom logic for handling Enter key press (e.g., submit form, trigger action)
      console.log("Enter key pressed:"); // Example logging the current content
    }
  };

  return (
    <div className="editable-container">
      <div
        ref={editableRef}
        contentEditable="true"
        className="editable"
        suppressContentEditableWarning={true}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export default Main;
