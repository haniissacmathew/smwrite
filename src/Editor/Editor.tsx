import Main from "./Main";
import LeftPanel from "./LeftPanel";
import "./Editor.css";
import { FiSave } from "react-icons/fi";

function Editor() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
        <LeftPanel />
        </div>
        <div className="col-8">
        <Main />
        </div>
      </div>
    </div>
  );
}

export default Editor;
