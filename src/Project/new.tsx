import  { useState } from "react";
import "./new.css"; // Import your CSS file
import Folder from "../assets/icons8-folder.svg";
function NewProject() {
  const [filePath, setFilePath] = useState("");
  const [content] = useState("title _SPLIT_    _END_ ");
  const [projectName, setProjectName] = useState("");
  const [selectedPath, setselectedPath] = useState("");
  const [selectedPathError, setselectedPathError] = useState("");

  const handleProjectNameChange = (event: any) => {
    setProjectName(event.target.value);
    validateFilePath();
  };

  const handleLocationChange = (event: any) => {
    setselectedPath(event.target.value);
    validateFilePath();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Perform form validation or data processing here
    createFile();
    // Reset the form after successful submission (optional)
    setProjectName("");
    setselectedPath("");
  };

  const handleSelectFolder = async () => {
    const selectedPath = await window.electron.selectFolder();
    if (selectedPath.length > 0) {
      setselectedPath(selectedPath[0]);
      validateFilePath();
      // setFolderPath(selectedPath[0]);
    }
  };
  //   ipcRenderer.on('last-opened-file', (event, filePath) => {
  //     if (filePath) {
  //         console.log('Last opened file:', filePath);
  //         // Perform operations with the last opened file
  //     }
  // });
  function validateFilePath() {
    const filePathRegex = /^(.+)\/([^\/]+)$/; // Simple check for common invalid characters
    if (filePathRegex.test(selectedPath)) {
      setselectedPathError("Error");
    } else {
      if(projectName!=""){
        setFilePath(selectedPath + "\\" + projectName + ".smwrite");
        setselectedPathError("");
      }

    }
  }
  const createFile = async () => {
    const response:any = await window.electron.createFile(filePath, content);
    if (response.success) {
      console.log("File created successfully!");
    } else {
      console.log(`Failed to create file: ${response.error}`);
    }
  };
  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h2>New Project</h2>
      <div className="form-group">
        <input
          type="text"
          id="projectName"
          name="projectName"
          value={projectName}
          onChange={handleProjectNameChange}
          placeholder="Enter project name"
          required
        />
      </div>
      <div className="form-group path-box">
        <input
          type="text"
          id="location"
          name="location"
          value={selectedPath}
          onChange={handleLocationChange}
          placeholder=""
          required
        />
        <img
          className="folder-icon"
          src={Folder}
          onClick={handleSelectFolder}
          alt="Vite logo"
        />
      </div>
      {selectedPathError}
      <button type="submit" disabled={projectName == "" || selectedPath == ""}>
        Create
      </button>
    </form>
  );
}

export default NewProject;
