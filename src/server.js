const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
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

// Used to remove mongoose deprecation warning
mongoose.set('strictQuery', false);

// ========================================================================================
// Application Routes
// ========================================================================================

app.get('/', (req, res) => {
    res.status(200).render('./pages/index', {title: 'Main Page'});
});

app.get('/gallery', (req, res) => {
    ImagePost.find().sort({createdAt: -1})
        .then((result) => {
            res.render('pages/gallery', {posts: result, title: 'Gallery'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).render('./pages/error', {title:'Internal Error Occured'});
        });
});

app.get('/gallery/post/:postId', (req, res) => {
    const postId = req.params.postId;
    ImagePost.findById(postId)
        .then(result => {
            res.render('pages/post', {post: result, title: result.title});
        })
        .catch((err) => {
            if(err instanceof mongoose.CastError){
                res.status(404).redirect('/*');
            }
            else{
                console.log(err);
                res.status(500).render('./pages/error', {title:'Internal Error Occured'});
            }
        });
});

app.get('/gallery/image/:imageId/:imageName', (req, res) => {
    const imageId = req.params.imageId;
    const imageName = req.params.imageName;
    Image.findById(imageId)
        .then(result => {
            if(result.originalname == imageName){
                res.status(200).contentType(result.mimetype).end(result.buffer["data"]);
            }
        })
        .catch((err) => {
            console.log(err); 
            res.status(500).send('Image Couldn\'t be found');
        });
});

app.get('/create', (req, res) => {
    res.status(200).render('./pages/create', {title: 'Create Post'});
});

app.post('/create', upload.single('attachment'), (req, res) =>{
    // Create image object
    const attachment = new Image({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        buffer: {
            data: req.file.buffer
        }
    });
    
    attachment.save()
        .then((result) => {
            // Create post object
            const imagePost = new ImagePost({
                userId: 'PLACEHOLDER_ID', // TODO Add ID validation
                title: req.body.title,
                description: req.body.description,
                tags: ['PLACEHOLDER', 'TAGS'], // TODO Add tag parsing
                attachmentId: result._id.toString(),
                attachmentName: req.file.originalname
            });

            imagePost.save()
                .then((result) => {
                    res.redirect('/');
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
});

// Route/Page not found handling. Leave this as the last get request
app.get('/*', (req, res) => {
    res.status(404).render('./pages/404', {title: '404 Not Found'})
});

// ========================================================================================
// Server Start
// ========================================================================================

// Connect to MongoDB
const connectOptions = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(DB_URI, connectOptions)
    .then((result) => {
        console.log('Connected to MongoDB database');
        
        // Application begins listening on port.
        app.listen(PORT, () => {
            console.log(`Application is listening on ${process.env.HOST_NAME}`);
        });
    })
    .catch((err) => console.log(err));
