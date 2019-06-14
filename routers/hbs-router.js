const { Router } = require('express');
const {
    getJSON,
    getProjectList,
    projectsJSONPath
} = require('../utils');

const router = new Router();

router.get('/', (req, res) => {
    const projects = getJSON(projectsJSONPath);
    const projectList = getProjectList(projects);

    res.render('index.hbs', {
        projectList
    });
});

router.get('/about', (req, res) => {
    res.send('About Page!');
});

router.get('/projects/:projectFolder/:projectName', (req, res) => {
    const projectSection = req.params.projectSection;
    const projectName = req.params.projectName;

    const projects = getJSON(projectsJSONPath);
    const projectList = getProjectList(projects);

    const projectData = projects[projectSection].find(el => el.name === projectName);
    const images = projectData.images.filter(image => image.show).map(image => image.filename);

    res.render('project-page.hbs', {
        projectSection,
        projectName,
        projectList,
        images
    });
});

module.exports = router;