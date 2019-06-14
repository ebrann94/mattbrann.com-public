import React from 'react';
import '../styles/CurrentProjectInfo.css';

const CurrentProjectInfo = (props) => {
    return (
        <div className="current-project__info"> 
            <h2>Selected Project:</h2>
            <h4 className="current-project__section">{props.currentProject.section}</h4>
            <h4 className="current-project__name">{props.currentProject.name}</h4>
        </div>
    )
}

export default CurrentProjectInfo;