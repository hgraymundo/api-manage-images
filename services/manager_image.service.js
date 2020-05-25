const fse = require('fs-extra');
const base_tmp = process.env.UPLOAD_TMP || '';
const company_base_picture = process.env.COMPANY_BASE_PICTURE || '';
const LOG = require('../helpers/logger.helper');
const responseHandler = require('../helpers/responseHandler.helper');

exports.create_directory_and_move_picture = async (_id, _filename) => {
    return new Promise( async (resolve, reject) => {
        try {
            await fse.move( `${base_tmp}/${_filename}`, `${company_base_picture}/${_filename}`)
            LOG.info(`La imagen de movio al directorio final`);
            let result = responseHandler.generateSuccesResponse(200, 'Se ha almacenado correctamente la imagen');
            resolve(result)
        } catch (error) {
            LOG.error(error)
            let err = responseHandler.generateSuccesResponse(500, error);
            reject(err) 
        }
    })
}
