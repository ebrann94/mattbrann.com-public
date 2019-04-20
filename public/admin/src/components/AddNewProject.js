import React, { useState } from 'react';

const AddNewProject = ({ handleAddNewProject }) => {
    const [fields, setFields] = useState({
        section: '',
        project: ''
    });

    const  handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setFields((prevFields) => ({
            ...prevFields,
            [name]: value
        }));
    }

    return (
        <div>
            <h3>Add New Project</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (fields.project && fields.section) {
                    handleAddNewProject(fields);
                }
            }}>
                <input 
                    type="text" 
                    name="section" 
                    placeholder="section"
                    value={fields.section}
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    name="project" 
                    placeholder="project" 
                    value={fields.project}
                    onChange={handleChange}
                />
                <input type="submit" value="Add New Project" />
            </form>
        </div>
    )
}

export default AddNewProject;