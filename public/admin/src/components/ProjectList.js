import React from 'react';
import ProjectListItem from './ProjectItem';
import '../styles/ProjectList.css';

const ProjectList = (props) => {
    if (props.projectList) {
        var keys = Object.keys(props.projectList);
    }
    
    return(
        <div>
            {keys &&
                keys.map(key => {
                    return (
                        <div key={key}>
                            <h3>{key}</h3>
                            <ul>
                                {
                                    props.projectList[key].map(current => (
                                        <ProjectListItem 
                                            key={current.name}
                                            name={current.name}
                                            section={key}
                                            handleSelectCurrentProject={props.handleSelectCurrentProject}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    );

}

export default ProjectList;