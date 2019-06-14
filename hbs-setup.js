const hbs = require('hbs');

// Register Partials
hbs.registerPartials(__dirname + '/views/partials/');

// Register Helpers
hbs.registerHelper('menu-composer', menuComposer);
hbs.registerHelper('image-list', imageList);

// Menu Helper
function menuComposer(currentPage, projectList) {

    function generateURL(section, name, current) {
        return name === current ? '#' : `/projects/${section}/${name}`;
    }

    const keys = Object.keys(projectList);
    const out = keys.map(key => {
        let isCurrentSection = false;

        const linksList = projectList[key].map(link => {
            if (currentPage === link) {
                isCurrentSection = true;
            }
            return `<li><a href="${generateURL(key, link, currentPage)}">${link.replace(/_/g, ' ')}</a></li>`;
        });

        if (linksList.length === 0) {
            return '';
        }

        const topicClassBase = 'menu__topic';
        const dropdownClassBase = 'drop-down-content';

        const topicClasses = isCurrentSection ?  topicClassBase + ' menu__topic--active' : topicClassBase;
        const dropdownClasses = isCurrentSection ? dropdownClassBase + ' drop-down--open' : dropdownClassBase;

        return  `
            <div class="menu__branch ${key}">
                <div class="${topicClasses}">
                    <h3>${key.replace(/_/g, ' ').toUpperCase()}</h3>
                </div>
                <div class="${dropdownClasses}">
                    <ul>
                        ${linksList.join('\n')}
                    </ul>
                </div>
            </div>
        `;
    });
    return new hbs.handlebars.SafeString(out.join(''));
}

// Image helper
function imageList(section, project, images) {
    const out = images.map(filename => {
        return `<img src="/images/${section}/${project}/${filename}" class="slideshow__slide" alt="project"/>\n`;
    });

    return new hbs.handlebars.SafeString(out.join(''));
}