const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
    res.render('index.hbs');
});

router.get('about', (req, res) => {
    res.send('About Page!');
});

router.get('/projects/:projectFolder/:projectName', (req, res) => {
    res.render('project-page.hbs', {
        projectTopic: req.params.projectFolder,
        projectName: req.params.projectName
    });
});

module.exports = router;