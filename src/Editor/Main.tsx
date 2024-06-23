import "./Main.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectScreenplay,
  updateByIndex,
  insertElement,
} from "../store/editorSlice";
import { processJson } from "./shared/service/common";
import { useEffect, useRef, useState } from "react";
function Main(props: any) {
  const dispatch = useDispatch();
  const editableRef = useRef(null);
  const popMenuRef = useRef(null);
  const [html, setHtml] = useState("<p>Editable content here</p>");
  const screenplay = useSelector(selectScreenplay);
  const [cursorPosition, setCursorPosition] = useState(
    props.initialValue || ""
  );
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [newItem, setNewItem] = useState(false);
  const menuOptions = [
    {
      label: "Scene heading",
      value: "scene",
    },
    {
      label: "Description",
      value: "paragraph",
    },
    {
      label: "Character",
      value: "character",
    },
    {
      label: "Dialogue",
      value: "dialogue",
    },
    {
      label: "Transition",
      value: "transition",
    },
  ];
  useEffect(() => {
    setHtml(processJson(screenplay));
  }, [screenplay]);
  useEffect(() => {
    setCursorPositionToLastEdit();
  }, [html]);
  useEffect(() => {
    /**
     * Click event handler for outside clicks
     * @param {MouseEvent} event The click event object
     */
    const handleClickOutside = (event: any) => {
      if (popMenuRef.current && !popMenuRef.current.contains(event.target)) {
        // Trigger the callback function passed as a prop
        // console.log("outside");
        setShowTooltip(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    /**
     * Cleanup function to remove the event listener
     */
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    // Add the ref as a dependency for the effect to run only once
  }, [popMenuRef]);
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
          // console.log(changedSpanElement);
          if (changedSpanElement.nodeName === "DIV") {
            // Check for "SPAN" tag
            const body: any = {
              // index: changedSpanElement.dataset.id,
              index: changedSpanElement.dataset.id,
              content: changedSpanElement.innerHTML,
            };
            dispatch(updateByIndex(body));
            saveCursorPosition();
            // ... rest of your code
          } else {
            console.log(`Changed div is not a div.`);
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

  const saveCursorPosition = () => {
    if (editableRef.current) {
      const selection: any = window.getSelection();
      if (selection.rangeCount > 0) {
        // console.log(selection.focusNode.parentElement.id);
        setCursorPosition({
          ...cursorPosition,
          selection: {
            offset: selection.getRangeAt(0).startOffset,
            node: selection.focusNode.parentElement.id,
            line: selection.focusNode.parentElement.dataset.id,
          },
        });
        // console.log(cursorPosition);
      }
    }
  };
  const setCursorPositionToLastEdit = () => {
    if (editableRef.current && editableRef.current.childNodes) {
      const selection: any = window.getSelection();
      const range = document.createRange();
      // console.log(editableRef.current.childNodes);
      // Set cursor position at index 1 (considering zero-based indexing)
      // range.setStart(editableRef.current.children[2], 1);
      // range.setEnd(editableRef.current.children[2], 1);
      // console.log(cursorPosition);
      if (
        cursorPosition &&
        cursorPosition.selection &&
        cursorPosition.selection.node &&
        cursorPosition.selection.offset
      ) {
        let nodeIndex = Number(cursorPosition.selection.node);
        let nodeOffset = Number(cursorPosition.selection.offset);

        if (newItem) {
          nodeIndex = nodeIndex + 1;
          nodeOffset = 0;
        }
        // console.log(nodeIndex, nodeOffset, editableRef.current);
        if (
          editableRef.current.childNodes[nodeIndex] &&
          editableRef.current.childNodes[nodeIndex].childNodes.length > 0
        ) {
          // console.log(editableRef.current.childNodes[nodeIndex]);
          // console.log(editableRef.current.childNodes[nodeIndex].childNodes[0]);
          range.setStart(
            editableRef.current.childNodes[nodeIndex].childNodes[0],
            nodeOffset
          );
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
          setNewItem(false);
        }
      }
    }
  };
  const handleKeyDown = (event: any) => {
    
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      event.preventDefault();
      // Control+Enter is pressed, perform your desired action
      console.log("Control+Enter detected!");
    } else if (event.keyCode === 13) {
      event.preventDefault();
      // Your custom logic for handling Enter key press (e.g., submit form, trigger action)
      // console.log("Enter key pressed:", event); // Example logging the current content
      const selection: any = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const { top, left } = rect;
        setTooltipPosition({ top, left });
        setShowTooltip(true);
        saveCursorPosition();
      }
    }
  };
  const handleMenuClick = (item: any) => {
    const body: any = {
      type: item.value,
      index: Number(cursorPosition.selection.line) + 1,
      content: "&nbsp;",
    };
    dispatch(insertElement(body));
    setNewItem(true);
    setShowTooltip(false);
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
      {showTooltip && (
        <div
          ref={popMenuRef}
          className="tooltip"
          style={{
            width: "auto",
            position: "absolute",
            top: tooltipPosition.top + 20, // Adjust tooltip position above the cursor
            left: tooltipPosition.left,
            // backgroundColor: "#4c3585",
            color: "#fff",
            // padding: "5px",
            borderRadius: "3px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <div className="vertical-menu">
            {menuOptions.map((item) => (
              <a key={item.value} onClick={() => handleMenuClick(item)}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
