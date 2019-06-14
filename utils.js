const fs = require('fs');
const path = require('path');

const { readFile, writeFile } = fs.promises;

const getJSONSync = (path) => {
    const rawjson = fs.readFileSync(path);
    return JSON.parse(rawjson);
};

const getJSON = async (jsonPath) => {
    const rawJson = await readFile(jsonPath, 'utf-8');
    return JSON.parse(rawJson);
};

const saveJSONSync = (path, objectToSave) => {
    fs.writeFileSync(path, JSON.stringify(objectToSave, undefined, 4));
    console.log('JSON Saved');
};

const saveJSON= async (jsonPath, objectToSave) => {
    await writeFile(jsonPath, JSON.stringify(objectToSave, undefined, 4));
};

const getProjectList = (projects) => {
    const out = {};
    const keys = Object.keys(projects);
    keys.forEach(key => {
        out[key] = projects[key].filter(el => el.show).map(el => el.name);
    });
    return out;
};

const projectsJSONPath = path.join(__dirname, 'data', 'projects.json');
const imageDirPath = path.join(__dirname, '..', 'images');

module.exports = {
    getJSON,
    saveJSON,
    getProjectList,
    projectsJSONPath,
    imageDirPath
};