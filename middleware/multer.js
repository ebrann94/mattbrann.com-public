const path = require('path');
const multer = require('multer');

const { imageDirPath } = require('../utils');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const destination = path.join(imageDirPath, 'images', req.body.section, req.body.projectName);
        cb(null, destination);
    },
    filename: function(req, file, cb) {
        const filename = file.originalname.replace(/ /g, '_');
        cb(null, filename);
    }
});

const upload = multer({ storage });

module.exports = upload;