
exports.generateSuccesResponse =  (code, message, data) => {
    return {
        "code": code || '',
        "message": message || '',
        "data": data || ''
    }
}

exports.generateErrorResponse =  (code, message, error) => { 
    return {
        "code": code || '',
        "message": message || '',
        "error": error || ''
    }
}