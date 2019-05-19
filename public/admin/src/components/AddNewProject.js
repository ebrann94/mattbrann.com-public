import React, { useState } from 'react';

const AddNewProject = ({ handleAddNewProject, sections }) => {
    const [fields, setFields] = useState({
        section: sections[0],
        project: '',
        newSection: ''
    });

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setFields((prevFields) => ({
            ...prevFields,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const section = !!fields.newSection ? fields.newSection : fields.section;

        if (section && fields.project) {
            handleAddNewProject(section, fields.project);
            setFields({
                section: sections[0],
                project: '',
                newSection: ''
            });
        }
    }

    return (
        <div>
            <h3>Add New Project</h3>
            <form onSubmit={handleSubmit}>
                <select 
                    name="section"
                    value={fields.section} 
                    onChange={handleChange}
                    disabled={fields.newSection}
                >
                    {sections.map((section) => {
                        return <option value={section} key={section} >{section}</option>
                    })}
                </select>
                <input 
                    type="text" 
                    name="newSection" 
                    placeholder="Add New Section"
                    value={fields.newSsection}
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    name="project" 
                    placeholder="Project" 
                    value={fields.project}
                    onChange={handleChange}
                />
                <input type="submit" value="Add Project" />
            </form>
        </div>
    )
}

export default AddNewProject;