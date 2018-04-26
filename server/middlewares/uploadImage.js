const multer = require('multer')
const Storage = require('@google-cloud/storage');
const config = {
  CLOUD_BUCKET: 'bucket-blogku',
  PROJECT_ID: 'phase2project',
}

// prepare storage
const storage = Storage({
  projectId: config.PROJECT_ID,
  keyFilename: 'phase2project-e4bd59041cf5.json'
});

// set which bucket
const bucket = storage.bucket(config.CLOUD_BUCKET);
// just a helper to create absolute path to GCS
function getPublicUrl (filename) {
  console.log('masuk get public-----------------------')
  return `https://storage.googleapis.com/${config.CLOUD_BUCKET}/${filename}`;
}

// the real middleware
function sendImageGCS (req, res, next) {
  console.log('masuk midlleware sendupload to gcs')
  if (!req.file) {
    return next('upload failed');
  }
  console.log('masuk else send')

  const gcsname = Date.now() + '.' + req.file.originalname.split('.').pop();
  console.log("gcsname==", gcsname)
  const file = bucket.file(gcsname);
  // prepare the stream
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  // handle when upload error
  stream.on('error', (err) => {
    // console.log("error",err)
    req.file.cloudStorageError = err;
    next(err); 
  });
  // handle when upload finish
  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    console.log("gcsname finish------------", gcsname)
    file.makePublic(). //make the uploaded file public
      then(() => {
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
      });
  });
  console.log("reqcloud====>>", req.file)
  // write the file
  stream.end(req.file.buffer);
}

module.exports = {
  sendImageGCS
}