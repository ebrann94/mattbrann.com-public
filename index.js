const path = require('path');
const express = require('express');

require('./hbs-setup');
const hbsRouter = require('./routers/hbs-router');
const adminRouter = require('./routers/admin-router');

const app = express();
const port = 3001;

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static( path.join(__dirname, 'public', 'admin', 'build')));
app.use(hbsRouter);
app.use(adminRouter);

app.listen(port, () => console.log('Listening on port ' + port));