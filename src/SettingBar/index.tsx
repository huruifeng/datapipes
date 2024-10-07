// Sidebar component for the settings of the nodes
// This component is used to display the settings of the selected node
import './SettingBar.css';
// @ts-ignore
import React from "react";
// @ts-ignore
import {ParamFrom} from "./ParamForm.tsx";

const SettingBar = ({ selectedNode }) => {
  return (
    <div className="setting">
      {selectedNode ? (
        <div>
          <ParamFrom selectedNode={selectedNode} />
        </div>
      ) : (
        <div>
            <h3>Settings</h3>
            <p>Select a node to view/set its settings</p>
        </div>
      )}
    </div>
  );
};


export default SettingBar;