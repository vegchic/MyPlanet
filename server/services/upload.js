import multer, { diskStorage } from 'koa-multer';

import { match } from './validator';

const MAX_SIZE = 409600;

function upload(path, name) {
    const storage = diskStorage({
        destination: function (req, file, cb) {
            cb(null, path);
        },
        filename: function (req, file, cb) {
            cb(null, name);
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

export default upload;