const awsSDK = require('aws-sdk');
const S3 = require('./s3');

const S3_ACCESS_KEY_ID = 'AKIASPVYWZUKFI2SVC7S';
const S3_SECRET_ACCESS_KEY = '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';
const AWS_REGION = 'ap-southeast-2';

awsSDK.config.update({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const {
  uploadImage: $uploadImageToS3,
  fetchImage: $fetchImageFromS3,
  uploadDoc: $uploadDocToS3,
  fetchDoc: $fetchDocFromS3,
} = S3(awsSDK);

module.exports = { $uploadImageToS3, $fetchImageFromS3, $uploadDocToS3, $fetchDocFromS3 };