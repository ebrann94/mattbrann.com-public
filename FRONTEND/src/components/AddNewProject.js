import React from 'react';

const AddNewProject = ({handleAddNewProject}) => {
    return (
        <div>
            <h3>Add New Project</h3>
            <form onSubmit={handleAddNewProject}>
                <input type="text" name="section" />
                <input type="text" name="project" />
                <input type="submit" value="Add New Project" />
            </form>
        </div>
    )
}

export default AddNewProject;