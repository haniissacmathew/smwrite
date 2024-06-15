import "./Main.css";
function Main() {
  return (
    <div className="editable-container">
      <div contentEditable="true" className="editable">
        Start editing here...
      </div>
    </div>
  );
}

export default Main;
