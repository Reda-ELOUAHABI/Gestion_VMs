class HttpError extends Error {
    constructor(message, erroCode) {
        super(message); //Add a 'message' property
        this.code = erroCode;
    }
}
module.exports = HttpError;