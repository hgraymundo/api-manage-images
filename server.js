const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8181;
const BASE_API = process.env.BASE_API || "/api/v1";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
require('./routes/upload_image.route')(app, BASE_API)

app.listen( PORT , () => {
    console.log(`Server running on PORT ${PORT}`);
})