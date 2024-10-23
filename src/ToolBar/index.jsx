// ToolBar/ToolBar.tsx
// @ts-ignore
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlayCircle, faStepForward,faSave, faFolderOpen, faSquarePlus} from '@fortawesome/free-solid-svg-icons';

interface ToolBarProps {
  onRunPipeline: () => void;
  onRunSelected: () => void;
  onRunToSelected: () => void;
  onNew: () => void;
  onSave: () => void;
  onOpen: () => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ onRunPipeline, onRunSelected, onRunToSelected,onNew, onSave, onOpen }) => {
  const buttonStyle = {
    marginRight: '5px',
    display: 'flex',
    alignItems: 'center',
    padding: '5px 5px',
    fontSize: '14px',
    borderRadius: '5px',
    backgroundColor: '#e0e0e0',
    border: '1px solid #ccc',
    cursor: 'pointer',
    transition: 'all 0.3s ease', // Smooth transition for hover and click effects
  };

  const hoverStyle = {
    backgroundColor: '#787373', // Slightly darker background on hover
    borderColor: '#aaa',        // Darken border on hover
  };

  const activeStyle = {
    transform: 'scale(0.95)',   // Scale down button when clicked
    backgroundColor: '#c0c0c0', // Darker background on click
  };

  const iconStyle = {
    fontSize: '18px',
    margin: '2px 10px',
  };

  return (
      <div style={{display: 'flex', justifyContent: 'space-between', padding: '3px', backgroundColor: '#f5f5f5'}}>
          <div className="funcRun" style={{display: 'flex', justifyContent: 'flex-start'}}>
              {/* Run Current Button */}
              <button  id="btn-runpipeline"
                  onClick={onRunPipeline}
                  style={buttonStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                  onMouseDown={(e) => {
                      e.currentTarget.style.transform = activeStyle.transform;
                      e.currentTarget.style.backgroundColor = activeStyle.backgroundColor;
                  }}
                  onMouseUp={(e) => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
                  }}
              >
                  <FontAwesomeIcon icon={faPlay} style={iconStyle}/>

              </button>

              {/* Run Selected Button */}
              <button  id="btn-runselected"
                  onClick={onRunSelected}
                  style={buttonStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                  onMouseDown={(e) => {
                      e.currentTarget.style.transform = activeStyle.transform;
                      e.currentTarget.style.backgroundColor = activeStyle.backgroundColor;
                  }}
                  onMouseUp={(e) => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
                  }}
              >
                  <FontAwesomeIcon icon={faPlayCircle} style={iconStyle}/>

              </button>

              {/* Run to Selected Button */}
              <button  id="btn-runtoselected"
                  onClick={onRunToSelected}
                  style={buttonStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                  onMouseDown={(e) => {
                      e.currentTarget.style.transform = activeStyle.transform;
                      e.currentTarget.style.backgroundColor = activeStyle.backgroundColor;
                  }}
                  onMouseUp={(e) => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
                  }}
              >
                  <FontAwesomeIcon icon={faStepForward} style={iconStyle}/>

              </button>
          </div>
          <div className="funcNewSaveOpen"
               style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '30px'}}>
              {/* start a pipeline */}
              <button id="btn-new"
                  onClick={onNew}
                  style={buttonStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                  onMouseDown={(e) => {
                      e.currentTarget.style.transform = activeStyle.transform;
                      e.currentTarget.style.backgroundColor = activeStyle.backgroundColor;
                  }}
                  onMouseUp={(e) => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
                  }}
              >
                  <FontAwesomeIcon icon={faSquarePlus} style={iconStyle}/>
              </button>

              {/* Open a pipeline */}
              <button  id="btn-open"
                  onClick={onOpen}
                  style={buttonStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                  onMouseDown={(e) => {
                      e.currentTarget.style.transform = activeStyle.transform;
                      e.currentTarget.style.backgroundColor = activeStyle.backgroundColor;
                  }}
                  onMouseUp={(e) => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
                  }}
              >
                  <FontAwesomeIcon icon={faFolderOpen} style={iconStyle}/>

              </button>

              {/* Save the pipeline */}
              <button  id="btn-save"
                  onClick={onSave}
                  style={buttonStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                  onMouseDown={(e) => {
                      e.currentTarget.style.transform = activeStyle.transform;
                      e.currentTarget.style.backgroundColor = activeStyle.backgroundColor;
                  }}
                  onMouseUp={(e) => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
                  }}
              >
                  <FontAwesomeIcon icon={faSave} style={iconStyle}/>
              </button>
          </div>
          {/* create a div to show file name at the most right position*/}
          <div style={{marginLeft: 'auto', padding:"5px 5px 5px 5px"}}>
              <span>
                  <img id="savingSpinner" style={{height:"15px", width:"15px", paddingRight:"5px", display:"None"}} src="./images/loading_buffering.gif" alt="loading..."/>
                  <span id="projName">Error: Untitled project</span>
              </span>
          </div>
      </div>
  );
};

export default ToolBar;