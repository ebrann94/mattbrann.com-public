import React from 'react';
import ProjectListItem from './ProjectItem';
import '../styles/ProjectList.css';

const ProjectList = (props) => {
    if (props.projectList) {
        var keys = Object.keys(props.projectList);
    }

    const projectList = (key) => {
        return props.projectList[key].map(current => (
            <ProjectListItem 
                key={current.name}
                name={current.name}
                section={key}
                handleSelectCurrentProject={props.handleSelectCurrentProject}
            />
        ))
    }
    
    return(
        <div>
            <h2>Projects: </h2>
            {keys &&
                keys.map(key => {
                    return (
                        <div key={key}>
                            <h3 className="project-list__section">{key}</h3>
                            <ul>
                                {projectList(key)}
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    );

}

export default ProjectList;