import React from 'react';
import './Modal.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faSquarePlus} from "@fortawesome/free-solid-svg-icons";

const Modal = ({ isOpen}) => {
   const iconStyle = {
    fontSize: '32px',
    margin: '10px 10px',
  };
  return (
    <div className="modal" style={{ display: isOpen ? 'flex' : 'none' }} id="myModal">
      <div className="modal-content">
        <h2>Select an Action</h2>
        <div className="button-group">
          <button className="icon-button" onClick={() => alert('Create New Project')}>
             <FontAwesomeIcon icon={faSquarePlus} style={iconStyle}/>
            <span>Create New Project</span>
          </button>
          <button className="icon-button" onClick={() => alert('Open Existing Project')}>
            <FontAwesomeIcon icon={faFolderOpen} style={iconStyle}/>
            <span>Open Existing Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
