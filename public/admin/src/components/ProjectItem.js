import React from 'react';

const ProjectListItem = (props) => (
    <li
        onClick={() => {
            console.log(props.name, props.section);
            props.handleSelectCurrentProject(props.section, props.name);
        }}
        className="project-list__item"
    >
        {props.name}
    </li>
);

export default ProjectListItem;