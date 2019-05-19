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

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'admin', 'build', 'index.html'));
});

router.post('/admin/login', (req, res) => {
    const { password } = req.body;

    const adminCredentials = getJSON(path.join(__dirname, '..', 'data', 'admin.json'))

    if (bcrypt.compareSync(password, adminCredentials.password)) {
        const token = jwt.sign({ payload: 'Hello World!' }, 'jacqui', { expiresIn: '1 days' });
        res.send({ 
            loginSuccess: true,
            token 
        });
    } else {
        res.status(401).send({ error: 'Username or password incorrect' });
    }
});

// Adds project data to projects.json and creates folder for project images.
router.post('/admin/add-new-project', auth, (req, res) => {
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

    
    res.json(projects);
});

// Adds the photo to the project image folder and adds the image name to projects.json
router.post('/admin/add-photo', auth, upload.single('photo'), (req, res) => {
    const { section, projectName } = req.body;

    const projects = getJSON(projectsJSONPath);

    projects[section].forEach(current => {
        if (current.name === projectName) {
            current.images.push(req.file.filename);
        }
    });

    saveJSONToFile(projectsJSONPath, projects);

    res.send();
});

router.get('/admin/projects', auth, (req, res) => {
    res.json(projectsJSON);
});

router.get('/admin/test-connection', (req, res) => {
    // console.log('Connection Established with front end');
    res.send();
});

module.exports = router;

