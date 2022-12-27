const express = require("express");
const app = express();

const port = process.env.PORT || 8080; // Attempts to pull port from docker env variable. If this value is falsy, set default to 8000.

app.set('view engine', 'ejs');

// Get request behavior renders index.ejs as the response
app.get('/', (req, res) => {
    res.render('pages/index', {});
});

// Application begins listening on port.
app.listen(port, () => {
    console.log(`Application is listening on http://localhost:${port}`);
});
