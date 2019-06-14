const fs = require('fs');
const path = require('path');
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

const projectsJSON = require('../data/projects.json');
const { getJSON, saveJSON, projectsJSONPath } = require('../utils');

const router = new Router();

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'admin', 'index.html'));
});

router.post('/admin/login', async (req, res) => {
    const { password } = req.body;

    const adminCredentials = await getJSON(path.join(__dirname, '..', 'data', 'admin.json'));

    if (bcrypt.compareSync(password, adminCredentials.password)) {
        const token = jwt.sign({ payload: 'Hello World!' }, 'App Secret', { expiresIn: '1 days' });
        res.send({ 
            loginSuccess: true,
            token 
        });
    } else {
        res.status(401).send({ error: 'Username or password incorrect' });
    }
});

// Adds project data to projects.json and creates folder for project images.
router.post('/admin/add-new-project', auth, async (req, res) => {
    const { section, projectName } = req.body;

    const newProject = {
        name: projectName,
        show: true,
        images: []
    };

    try {
        // Edit projects.json file
        const projects = await getJSONAsync(projectsJSONPath);

        if (projects.hasOwnProperty(section)) {
            projects[section].push(newProject);
        } else {
            projects[section] = [newProject];
        }

        await saveJSON(projectsJSONPath, projects);

        // Make directory for images
        const imageDirectoryPath = path.join(__dirname, '../public/images', section, projectName);

        fs.access(imageDirectoryPath, (err) => {
            if (err && err.code === 'ENOENT') {
                fs.mkdir(imageDirectoryPath);
            }
        });

        res.json(projects);
    } catch (e) {
        res.status(500).send();
    }
});

// Adds the photo to the project image folder and adds the image name to projects.json
router.post('/admin/add-photo', auth, upload.single('photo'), async (req, res) => {
    const { section, projectName } = req.body;

    try {
        const projects = await getJSON(projectsJSONPath);

        projects[section].forEach(current => {
            if (current.name === projectName) {
                current.images.push(req.file.filename);
            }
        });

        await saveJSON(projectsJSONPath, projects);

        res.send();
    } catch (e) {
        res.status(501).send();
    }
});

router.get('/admin/projects', auth, async (req, res) => {
    try {
        const projects = await getJSON((projectsJSONPath));
        res.json(projects);
    } catch (e) {
        res.status(501).send();
    }
});

const renameFile = fs.promises.rename;
router.post('/admin/update-projects', auth, async (req, res) => {
    const newProjects = req.body;

    try {
        await renameFile(projectsJSONPath, path.join(__dirname,'..', 'data', 'prevProjects.json'));
        await saveJSON(projectsJSONPath, newProjects);

        res.send();
    } catch (e) {
        res.status(501).send();
    }
});

router.get('/admin/test-connection', (req, res) => {
    // console.log('Connection Established with front end');
    res.send();
});

module.exports = router;

