const multer = require('koa-multer');

const match = require('./validator');

const MAX_SIZE = 204800;

function upload(path, name) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path);
        },
        filename: function (req, file, cb) {
            cb(null, `${name}.${file.mimetype.split('/')[1]}`);
        },
    });
    return multer({
        storage,
        fileFilter: function (req, file, cb) {
            if (match(file.mimetype, 'image')) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        },
        limits: { fileSize: MAX_SIZE }
    }).single('file');
}

module.exports = upload;