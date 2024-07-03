import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectScreenplay,
} from "../store/editorSlice";
import { processSceneheadings,processCharacter } from "./shared/service/common";
import "./LeftPanel.css";
import { FiList } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiGrid } from "react-icons/fi";

function LeftPanel() {
  const [scenes, setScenes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const screenplay = useSelector(selectScreenplay);
  const [activeTab, setActiveTab] = useState('Tab1');

  const handleTabClick = (tab:any) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    setScenes(processSceneheadings(screenplay));
    setCharacters(processCharacter(screenplay));
  }, [screenplay]);
  return (
    <div className="tabs">
    <div className="tab-buttons">
      <button data-tooltip="Tooltip text"
        className={activeTab === 'Tab1' ? 'active' : ''}
        onClick={() => handleTabClick('Tab1')}
      >
        <FiList style={iconStyle} />
      </button>
      <button
        className={activeTab === 'Tab2' ? 'active' : ''}
        onClick={() => handleTabClick('Tab2')}
      >
       <FiUser style={iconStyle} />
      </button>
      <button
        className={activeTab === 'Tab3' ? 'active' : ''}
        onClick={() => handleTabClick('Tab3')}
      >
        <FiGrid style={iconStyle} />
      </button>
    </div>
    <div className="tab-content">
      {activeTab === 'Tab1' && <div>
        {scenes.map((scene: any,index: any) => (
          <p key={'scn_'+index}>{scene.text}</p>
        ))}
        </div>} 
      {activeTab === 'Tab2' && <div>
        {characters.map((char: any,index: any) => (
          <p key={'char_'+index}>{char.text}</p>
        ))}
        </div>}
      {activeTab === 'Tab3' && <div>Update Soon...!</div>}
    </div>
  </div>
  );
}


const iconStyle = {
  width: '24px',
  height: '24px'
};
export default LeftPanel;
