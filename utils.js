const fs = require('fs');
const path = require('path');

const getJSON = (path) => {
    const rawjson = fs.readFileSync(path);
    return JSON.parse(rawjson);
}

const saveJSONToFile = (path, objectToSave) => {
    fs.writeFileSync(path, JSON.stringify(objectToSave, undefined, 4));
    console.log('JSON Saved');
}

const projectsJSONPath = path.join(__dirname, 'data', 'projects.json');

module.exports = {
    getJSON,
    saveJSONToFile,
    projectsJSONPath
}