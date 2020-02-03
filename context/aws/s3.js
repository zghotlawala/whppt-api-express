const S3_BUCKET_NAME = process.env.S3BUCKET || 'media.dev.samuseum.svelteteam.com';

// eslint-disable-next-line no-console
console.log('TCL: S3_BUCKET_NAME', S3_BUCKET_NAME);

module.exports = awsSDK => {
  const s3 = new awsSDK.S3();

  const uploadImage = function(fileBuffer, id) {
    const uploadImagePromise = new Promise((resolve, reject) => {
      s3.putObject(
        {
          Bucket: S3_BUCKET_NAME,
          Key: `images/${id}`,
          Body: fileBuffer,
          ACL: 'public-read',
          ContentEncoding: 'base64',
        },
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    return uploadImagePromise.then(result => {
      return result;
    });
  };

  const uploadDoc = function(fileBuffer, id, meta) {
    const uploadDocPromise = new Promise((resolve, reject) => {
      s3.putObject(
        {
          Bucket: S3_BUCKET_NAME,
          Key: `docs/${id}`,
          Body: fileBuffer,
          Metadata: meta,
          ContentEncoding: 'base64',
        },
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    return uploadDocPromise.then(result => {
      return result;
    });
  };

  const fetchImage = function(id) {
    return new Promise((resolve, reject) => {
      s3.getObject({ Bucket: S3_BUCKET_NAME, Key: `images/${id}` }, (err, imageData) => {
        if (err) return reject(err);
        if (!imageData || !imageData.Body) return reject(new Error('No image body'));
        resolve({ imageBuffer: imageData.Body });
      });
    });
  };

  const fetchDoc = function(id) {
    return new Promise((resolve, reject) => {
      s3.getObject({ Bucket: S3_BUCKET_NAME, Key: `docs/${id}` }, (err, docData) => {
        if (err) return reject(err);
        if (!docData || !docData.Body) return reject(new Error('No document body'));
        resolve({ imageBuffer: docData.Body });
      });
    });
  };

  return { uploadImage, fetchImage, uploadDoc, fetchDoc };
};