# mattbrann.com - Full Stack

A website built to showcase a photographers portfolio and allow them to manage the content.

## Stack

#### Backend

The backend runs on Node.js and uses the `express` framework. 

It uses the `hbs` view engine to make use of `handlebars.js` templating. The main pages of site are built from JSON data passed into `handlebars.js`.

It also includes a admin REST API that allows the admin to manage the content. The API is accessed via a password protected React app. It allows the admin to create new project pages and upload the corresponding images. It also allows the admin to choose what projects/photos are visible on the site. The server utilises the `multer` express middlewrare to handle file uploads.

#### Front End

The front end is written using HTML5 (with templating), CSS3 and Javascript. 

The JavaScript is used for basic DOM manipulation such as the accordian navigation menu and the photo gallery.