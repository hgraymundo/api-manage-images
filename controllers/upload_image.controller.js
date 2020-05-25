const multer = require('multer');
const LOG = require('../helpers/logger.helper');
const tmp_upload = process.env.TMP_UPLOAD || "tmp";
const managerImage = require('../services/manager_image.service');
const responseHandler = require('../helpers/responseHandler.helper');


var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null,  `${tmp_upload}/`)
    },
    filename: function (req, file, cb) {

        if(file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            cb(null, Date.now()  + '-' +  file.originalname )
        } else {
          let error = new Error();
          error.code = "400"
          error.message ="unsupported image type"
          cb(error)
        }
    }
})

const upload = multer({ storage: storage, limits:{ fileSize: 1048576 }}).single('company_picture')

exports.upload_image = async (req, res, next) => {
    LOG.info("UPLOAD CONTROLLER");
    try {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
          if(err.code === "LIMIT_FILE_SIZE") {
            let result =  responseHandler.generateErrorResponse("400","File too large",'');
            res.json(result)
            LOG.error(result)
          } else {
            LOG.error(err)
            res.json(err)
          }

        } else if (err) { // An unknown error occurred when uploading.
          LOG.error(err)
          res.json(err)
        } else {
          if(!req.file) {
            let result =  responseHandler.generateErrorResponse("400","There are no files to upload",'');
            LOG.error(result.message);  
            res.status(result.code).json(result);
          } else {
            LOG.info(`Imagen ${req.file.filename} almacenada exitosamente en tmp`)
              try {
                managerImage.create_directory_and_move_picture(req.body._id,req.file.filename )
                  .then( result =>{
                    res.status(result.code).json(result);
                  })
                  .catch( err => {
                    LOG.error(err)
                    res.json(error);
                  })
              } catch (error) {
                 res.json(error);
              }
          }
        }
      })
    } catch (error) {
      LOG.error(error)
      res.json(error)
    }
}


