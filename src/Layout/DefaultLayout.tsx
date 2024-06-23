import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom"; // Import Outlet for child routes
import {  useDispatch, useSelector } from 'react-redux';
import {loadScreenplay,selectScreenplay} from '../store/editorSlice';
import {parseTaggedString,doTaggedToString} from '../shared/service/screenplayEngine';
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
         
          const jsonData:any=parseTaggedString(data.data);
          
          // const string=doTaggedToString(jsonData);
          // console.log(jsonData);
          if(jsonData.length>0){
            // console.log(jsonData,"empty");	
            dispatch(loadScreenplay(jsonData));
          }
          navigate('/editor')
        }
      ); 
      window.electron.ipcRenderer.on("save-file-triggered", (event: any, data: any) => {
        let stringData=doTaggedToString(screenplay);
        console.log('stringData',stringData);
        saveFile(stringData);
      });
      return () => {
        // Remove all listners individually otherwise it will cause memory leaks
        window.electron.ipcRenderer.removeAllListeners("save-file-triggered");
        window.electron.ipcRenderer.removeAllListeners("navigate");
        window.electron.ipcRenderer.removeAllListeners("file-content");
      };
    }
  }, [screenplay]);
  // useEffect(() => {
  //   // console.log("screenplay",screenplay);
  //   setLocalScreenPlay(screenplay);
  //   // console.log("localScreenplay",localScreenplay);
  //   //
  // }, [screenplay]);
  const saveFile = async (stringData) => {
    console.log('get stirng from store and send to save file',screenplay);
    
    if( stringData!=""){
      const response = await window.electron.saveFile( stringData);
      if (response.success) {
        console.log("File saved successfully!");
      } else {
        console.log(`Failed to save file: ${response.error}`);
      }
    }
  }
  return <Outlet />;
}

export default DefaultLayout;
