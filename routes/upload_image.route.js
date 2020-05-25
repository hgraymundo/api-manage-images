const uploadImageController = require('../controllers/upload_image.controller');
module.exports = (app, BASE_API) => {
    app.post(BASE_API + "/upload_image", uploadImageController.upload_image);
}