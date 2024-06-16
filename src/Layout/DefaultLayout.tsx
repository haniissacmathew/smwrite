import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom"; // Import Outlet for child routes
import {  useDispatch } from 'react-redux';
import {loadScreenplay} from '../store/editorSlice';
import {parseTaggedString,doTaggedToString} from '../shared/service/screenplayEngine';
function DefaultLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.electron) {
      window.electron.ipcRenderer.on("navigate", (event: any, data: any) => {
        navigate(data);
      });
      window.electron.ipcRenderer.on(
        "file-content",
        (event: any, data: any) => {
         
          const jsonData:any=parseTaggedString(data.data);
          
          // const string=doTaggedToString(jsonData);
          console.log(jsonData);
          if(jsonData.length>0){
            console.log(jsonData,"empty");	
            dispatch(loadScreenplay(jsonData));
          }
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
