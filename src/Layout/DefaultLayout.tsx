import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom"; // Import Outlet for child routes

function DefaultLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.electron) {
      window.electron.ipcRenderer.on("navigate", (event: any, data: any) => {
        navigate(data);
      });
      window.electron.ipcRenderer.on(
        "file-content",
        (event: any, data: any) => {
          console.log(data);
          navigate('/editor')
        }
      );
      return () => {
        // Remove all listners individually otherwise it will cause memory leaks
        window.electron.ipcRenderer.removeAllListeners("navigate");
        window.electron.ipcRenderer.removeAllListeners("file-content");
      };
    }
  }, []);
  return <Outlet />;
}

export default DefaultLayout;
