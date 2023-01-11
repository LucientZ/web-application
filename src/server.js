const express = require('express');
const multer = require('multer');
const Image = require('../models/image.model');
const ImagePost = require('../models/imagepost.model');
require('dotenv').config({path: './config/.env'});

// ========================================================================================
// Environment Variables
// ========================================================================================

const PORT = process.env.PORT || 8080;
const DB_URI = process.env.DB_URI;

// ========================================================================================
// Middleware Initialization 
// ========================================================================================

// Initialize express object
const app = express();
app.use(express.urlencoded({extended: true}));

// Initialize Multer Object for parsing binary data for images.
const _storage = multer.memoryStorage();
const upload = multer({storage: _storage});

// Configure Application
app.set('view engine', 'ejs');
app.use('/public',express.static('public'))

// ========================================================================================
// Application Routes
// ========================================================================================

app.get('/', (req, res) => {
    res.status(200);
    res.render('./pages/index', {title: 'Main Page'});
});

app.get('/create', (req, res) =>{
    res.render('./pages/create', {title: 'Create Post'});
});

app.post('/create', upload.single('attachment'), (req, res) =>{
    const attachment = req.file;
    const textArguments = req.body;
});

app.get('*', (req, res) =>{
    res.status(404);
    res.render('./pages/404', {title: '404 Not Found'})
});

// Application begins listening on port.
app.listen(PORT, () => {
    console.log(`Application is listening on ${process.env.HOST_NAME}`);
});
