const imageParser = require('../configs/cloudinary');

function addPhotoToObject(req, data) {
    const workingData = Object.assign(data);
    if (req.file) {
        workingData.photo_url = req.file.url;
        workingData.photo_public_id = req.file.public_id;
        return workingData;
    } else {
        return workingData;
    }
}

module.exports = addPhotoToObject;
