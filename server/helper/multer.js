const multer = require('multer');
const path = require('path');
// The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      console.log(req.body,"masuk ke helpers multer destination",file,"------");
    cb(null, 'uploads')
  },
  filename: function(req, file, cb) {
    console.log(req.body,"masuk ke helpers multer file name",file);
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

module.exports = storage;