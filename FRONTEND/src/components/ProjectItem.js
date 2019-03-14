import React from 'react';

const ProjectListItem = (props) => (
    <li
        onClick={() => {
            console.log(props.name, props.section);
            props.handleSelectCurrentProject(props.section, props.name);
        }}
    >
        {props.name}
    </li>
);

export default ProjectListItem;