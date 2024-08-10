"use server";

import * as sdk from "node-appwrite";

const client = new sdk.Client();

if (!process.env.APPWRITE_API_KEY || !process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_PROJECT_ID) {
  throw new Error("Please set the APPWRITE_API_KEY, APPWRITE_ENDPOINT and APPWRITE_PROJECT_ID env variables");
}

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
    .setKey(process.env.APPWRITE_API_KEY) // Your secret API key
;


const storage = new sdk.Storage(client);

async function uploadFile(file: File) {
  if (!process.env.APPWRITE_STORAGE_ID) {
    throw new Error("Please set the APPWRITE_STORAGE_ID env variable");
  }

  // change file now with date now
  const fileID = sdk.ID.unique();
  return await storage.createFile(
      process.env.APPWRITE_STORAGE_ID,
      fileID,
      file,
      [],
  );
}

export {uploadFile};