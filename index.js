const express = require('express');

require('./hbs-setup');
const hbsRouter = require('./routers/hbs-router');
const adminRouter = require('./routers/admin-router');
const { imageDirPath } = require('./utils');

const app = express();
const port = 3001;

app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.static('admin/build'));
app.use(express.static(imageDirPath));
app.use(express.json());
app.use(hbsRouter);
app.use(adminRouter);

app.listen(port, () => console.log('Listening on port ' + port));