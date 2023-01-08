const express = require("express");
require('dotenv').config({path: './config/.env'});

const app = express();
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 8080; // Attempts to pull port from env variable. If this value is falsy, set default to 8000.

// Set Express to render ejs files
app.set('view engine', 'ejs');

// Application Routes
app.get('/', (req, res) => {
    res.status(200);
    res.render('./pages/index', {title: 'Main Page'});
});

app.get('*', (req, res) =>{
    res.status(404);
    res.render('./pages/404', {title: '404 Not Found'})
});



// Application begins listening on port.
app.listen(port, () => {
    console.log(`Application is listening on ${process.env.HOST_NAME}`);
});
