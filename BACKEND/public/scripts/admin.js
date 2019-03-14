
const currentProjectsDOM = document.querySelector('.current-projects');

let data;
const displayData = (projectData) => {
    console.log(projectData);
    const topicsList = [];
    for(let topic in projectData) {
        console.log(topic);
        let projectList = [];
        for(const project in projectData[topic]) {
            const newproject = `<li>${project.replace('_', ' ')}</li>`;
            projectList.push(newproject);
        }
        
        const newTopic = `
        <h4>${topic.replace('_', ' ')}</h4>
            <ul>
                ${projectList.join('')}
            </ul>
        `;
        
        topicsList.push(newTopic);
    }
    currentProjectsDOM.innerHTML = topicsList.join('');
}

const fetchData = () => {
    fetch('/admin/projects')
        .then(res => res.json())
        .then(json => {
            data = json.projects
            displayData(data);
        });

}
fetchData();

const addNewProjectForm = document.querySelector('.add-project-form');

addNewProjectForm.addEventListener('submit', (e) => {
    const newProject = {
        projectName: e.target.project_topic,
        projectTopic: e.target.project_name
    }

});

const postData = (newProject) => {

    fetch('/admin/add-new-project', {
        method: 'POST',
        body: JSON.stringify(newProject),
        header: {

        }
    })
}