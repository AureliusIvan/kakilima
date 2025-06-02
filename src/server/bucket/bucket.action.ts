"use server";

import * as sdk from "node-appwrite";

const client = new sdk.Client();

// Determine if we are in a build phase
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

if (!isBuildPhase && (!process.env.APPWRITE_API_KEY || !process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_PROJECT_ID)) {
  // Only throw an error if not in build phase and env vars are missing
  throw new Error("Runtime Error: APPWRITE_API_KEY, APPWRITE_ENDPOINT, and APPWRITE_PROJECT_ID must be set.");
}

// Conditionally initialize client if variables are present
if (process.env.APPWRITE_ENDPOINT && process.env.APPWRITE_PROJECT_ID && process.env.APPWRITE_API_KEY) {
  client
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
    .setKey(process.env.APPWRITE_API_KEY) // Your secret API key
  ;
} else if (!isBuildPhase) {
  // If not in build phase and variables are still missing, it's an issue.
  console.warn("Runtime Warning: Appwrite client for bucket actions could not be fully configured due to missing environment variables.");
}


const storage = new sdk.Storage(client);

// Renamed original function
async function uploadFileToAppwriteStorage(file: File) {
  if (!process.env.APPWRITE_STORAGE_ID) {
    // Handle missing Appwrite storage ID during build
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      console.warn("Build Warning: APPWRITE_STORAGE_ID not set. uploadFileToAppwriteStorage will not work.");
      // Depending on usage, might return a mock error or specific build-time response
      return Promise.reject(new Error("Build Warning: APPWRITE_STORAGE_ID not set."));
    }
    throw new Error("Runtime Error: Please set the APPWRITE_STORAGE_ID env variable");
  }

  // Ensure Appwrite client is somewhat configured before use, especially if called server-side during build
  if (!client.config.project && process.env.NEXT_PHASE === 'phase-production-build') {
      console.warn("Build Warning: Appwrite client not configured for uploadFileToAppwriteStorage.");
      return Promise.reject(new Error("Build Warning: Appwrite client not configured."));
  }

  // change file now with date now
  const fileID = sdk.ID.unique();
  return await storage.createFile(
      process.env.APPWRITE_STORAGE_ID!, // Added non-null assertion as check is above
      fileID,
      file,
      [],
  );
}

// --- New S3 Upload Function ---
import s3Client from '@/lib/aws-s3'; // Adjust path if needed
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { v4 as uuidv4 } from 'uuid';

export async function uploadFileToS3(formData: FormData) {
  const file = formData.get('file') as File;

  if (!file) {
    throw new Error('No file provided.');
  }

  const s3BucketName = process.env.AWS_S3_BUCKET_NAME;
  if (!s3BucketName) {
    // Handle missing S3 bucket name during build
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      console.warn("Build Warning: AWS_S3_BUCKET_NAME not set. S3 upload will fail.");
      return { success: false, error: "Build Warning: AWS_S3_BUCKET_NAME not set." };
    }
    throw new Error('Runtime Error: S3 bucket name is not configured (AWS_S3_BUCKET_NAME).');
  }

  // Check if s3Client is properly configured (especially if accessKeyId is missing, it means no credentials)
  // This check relies on how s3Client from aws-s3.ts is structured.
  // A more direct check would be s3Client.config.credentials directly if that was how it was set.
  if (!s3Client.config.accessKeyId && !(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) ) {
     // Allow to proceed during build phase, but log a warning. It will fail at runtime if used without credentials.
    if (process.env.NEXT_PHASE === 'phase-production-build') {
        console.warn("Build Warning: AWS S3 client credentials are not fully configured. S3 upload might fail at runtime.");
    } else {
        // At runtime, if credentials are still not there (e.g. from IAM role either) then it's an error.
        // However, s3Client might still work if IAM roles are configured on the server.
        // So, this check is a bit tricky. For now, let's assume if explicit keys are missing, it might be an issue.
        console.error("Runtime Warning/Error: AWS S3 client credentials are not explicitly configured. Relying on IAM role or instance profile.");
        // Depending on requirements, could throw new Error("S3 client credentials not configured.");
    }
  }


  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const params: PutObjectRequest = {
    Bucket: s3BucketName,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
    ACL: 'public-read', // Or your desired ACL
  };

  try {
    const uploadResult = await s3Client.upload(params).promise();
    console.log('File uploaded to S3:', uploadResult.Location);
    return { success: true, url: uploadResult.Location, key: uploadResult.Key };
  } catch (error: any) {
    console.error('Error uploading to S3:', error);
    // Provide a more generic error during build if it's due to config.
    if (process.env.NEXT_PHASE === 'phase-production-build' && (error.code === 'CredentialsError' || error.code === 'MissingCredentials')) {
        return { success: false, error: "Build Error: S3 upload failed due to missing credentials during build."};
    }
    return { success: false, error: error.message };
  }
}

export {uploadFileToAppwriteStorage, uploadFileToS3 as uploadFile}; // Exporting S3 version as default 'uploadFile'