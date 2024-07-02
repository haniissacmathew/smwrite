import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom"; // Import Outlet for child routes
import { useDispatch, useSelector } from "react-redux";
import { loadScreenplay, selectScreenplay } from "../store/editorSlice";
import {
  parseTaggedString,
  doTaggedToString,
} from "../shared/service/screenplayEngine";
function DefaultLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const screenplay = useSelector(selectScreenplay);
  const [localScreenplay, setLocalScreenPlay] = useState("");
  useEffect(() => {
    if (window.electron) {
      window.electron.ipcRenderer.on("navigate", (event: any, data: any) => {
        navigate(data);
      });
      window.electron.ipcRenderer.on(
        "file-content",
        (event: any, data: any) => {
          const jsonData: any = parseTaggedString(data.data);

          if (jsonData.length > 0) {
            dispatch(loadScreenplay(jsonData));
          }
          navigate("/editor");
        }
      );

      return () => {
        // Remove all listners individually otherwise it will cause memory leaks
        window.electron.ipcRenderer.removeAllListeners("save-file-triggered");
        window.electron.ipcRenderer.removeAllListeners("navigate");
        window.electron.ipcRenderer.removeAllListeners("file-content");
      };
    }
  }, [screenplay]);

  return <Outlet />;
}

export default DefaultLayout;
