const hbs = require('hbs');
const fs = require('fs');
const path = require('path');

const { getJSON, projectsJSONPath } = require('./utils');


// Register Partials
hbs.registerPartials(__dirname + '/views/partials/');

// Register Helpers
hbs.registerHelper('menu-composer', menuComposer);
hbs.registerHelper('image-list', imageList);

// Menu Helper
function menuComposer(currentPage) {
    const projects = getJSON(projectsJSONPath);

    let out = [];
    for(let property in projects) {
        const links = projects[property].map(link => {
            if (link.name.toLowerCase() !== currentPage) {
                return `<li><a href="/projects/${property}/${link.name.toLowerCase()}">${link.name.replace('_', ' ')}</a></li>`;
            } else {
                return `<li><a href="#">${link.name.replace('_', ' ')}</a></li>`
            }
        });
        const branch = `
            <div class="menu__branch ${property}">
                <div class="menu__topic">
                    <h3>${property.replace('_', ' ').toUpperCase()}</h3>
                </div>
                <div class="drop-down-content">
                    <ul>
                        ${links.join('\n')}
                    </ul>
                </div>
            </div>
        `
        out.push(branch);
    }
    return new hbs.handlebars.SafeString(out.join(''));
}


// Image helper
function imageList(folder, project) {
    const projects = getJSON(projectsJSONPath);

    let out = [];
    projects[folder].forEach(current => {
        if(current.name === project) {
            out = current.images.map(imageName => {
                return `<img src="/images/${folder}/${project}/${imageName}" />\n`
            });
        }
    });

    return new hbs.handlebars.SafeString(out.join('\n')); 
}