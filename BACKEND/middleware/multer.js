const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const destination = path.join(__dirname, '..', 'public', 'images', req.body.section, req.body.projectName);
        console.log(destination);
        cb(null, destination);
    },
    filename: function(req, file, cb) {
        const filename = file.originalname.replace(/ /g, '_');
        console.log(filename);
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;