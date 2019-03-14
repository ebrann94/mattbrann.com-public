const fs = require('fs');
const path = require('path');
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

const projectsJSON = require('../data/projects.json');
const { getJSON, saveJSONToFile, projectsJSONPath } = require('../utils');

const router = new Router();

router.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    const adminCredentials = getJSON(path.join(__dirname, '..', 'data', 'admin.json'))

    if (adminCredentials.username === username && bcrypt.compareSync(password, adminCredentials.password)) {
        console.log('Credentials Correct');
    } else {
        console.log('Credentials Incorrect');
    }

    // const token = jwt.sign()

    res.send();
});

// Adds project data to projects.json and creates folder for project images.
router.post('/admin/add-new-project', (req, res) => {
    const { section, projectName } = req.body;

    const newProject = {
        name: projectName,
        show: true,
        images: []
    }
    
    // Edit projects.json file
    const projects = getJSON(projectsJSONPath);
    
    if(!projects) {
        return res.status(400).send('Unable to add project');
    }

    if (projects.hasOwnProperty(section)) {
        projects[section].push(newProject);
    }

    saveJSONToFile(projectsJSONPath, projects);

    // Make directory for images
    const imageDirectoryPath = path.join(__dirname, '../public/images', section, projectName)

    if (!fs.existsSync(imageDirectoryPath)) {
        fs.mkdirSync(imageDirectoryPath);
    } 


    res.send();
});

// Adds the photo to the project image folder and adds the image name to projects.json
router.post('/admin/add-photo', upload.single('photo'), (req, res) => {
    const { section, projectName } = req.body;

    const projects = getJSON(projectsJSONPath);

    projects[section].forEach(current => {
        if (current.name === projectName) {
            current.images.push(photoName);
        }
    });

    saveJSONToFile(projectsJSONPath, projects);

    res.send();
});

router.get('/admin/projects', (req, res) => {
    res.json(projectsJSON);
});

module.exports = router;

