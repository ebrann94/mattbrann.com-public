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
        let topicClassNames = 'menu__topic';
        let dropdownClass = 'drop-down-content'

        const links = projects[property].map(link => {
            if (link.name.toLowerCase() !== currentPage) {
                return `<li><a href="/projects/${property}/${link.name.toLowerCase()}">${link.name.replace('_', ' ')}</a></li>`;
            } else {
                topicClassNames += ' menu__topic-active';
                dropdownClass += ' open';
                return `<li><a href="#">${link.name.replace('_', ' ')}</a></li>`
            }
        });
        
        const branch = `
            <div class="menu__branch ${property}">
                <div class="${topicClassNames}">
                    <h3>${property.replace('_', ' ').toUpperCase()}</h3>
                </div>
                <div class="${dropdownClass}">
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
                return `<img src="/images/${folder}/${project}/${imageName}" class="slideshow__slide slide__portrait"/>\n`
            });
        }
    });

    return new hbs.handlebars.SafeString(out.join('\n')); 
}