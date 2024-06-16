import Main from "./Main";
import LeftPanel from "./LeftPanel";
import "./Editor.css";
import { FiSave } from "react-icons/fi";

function Editor() {
  return (
    <div className="container">
      <div className="action-container"><FiSave /></div>
      <div className="row">
        <div className="col-2">
        <LeftPanel />
        </div>
        <div className="col-10">
        <Main />
        </div>
      </div>
    </div>
  );
}

export default Editor;
