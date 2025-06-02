import S3 from 'aws-sdk/clients/s3';

const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

if (!isBuildPhase && (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_S3_REGION || !process.env.AWS_S3_BUCKET_NAME)) {
  // In a real scenario, you might want to throw an error only if the S3 functionality is actively used.
  // For now, this strict check helps ensure all vars are considered.
  console.warn(
    "Warning: AWS S3 environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_REGION, AWS_S3_BUCKET_NAME) are not fully set. S3 functionality might be impaired if these are required at runtime."
  );
  // Depending on strictness, you might throw new Error(...) here for runtime if any are missing.
}

const s3ClientOptions: S3.ClientConfiguration = {
  signatureVersion: 'v4',
};

if (process.env.AWS_ACCESS_KEY_ID) {
  s3ClientOptions.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
}
if (process.env.AWS_SECRET_ACCESS_KEY) {
  s3ClientOptions.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
}
if (process.env.AWS_S3_REGION) {
  s3ClientOptions.region = process.env.AWS_S3_REGION;
}

// Initialize S3 client.
// It's initialized even if env vars are missing during build,
// but actual calls will fail if credentials aren't truly there at runtime.
const s3Client = new S3(s3ClientOptions);

export default s3Client;
