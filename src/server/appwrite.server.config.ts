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

const databases = new sdk.Databases(client);

async function getPost() {
  if (!process.env.APPWRITE_DATABASE_ID || !process.env.APPWRITE_COLLECTION_ID) {
    throw new Error("Please set the APPWRITE_DATABASE_ID and APPWRITE_COLLECTION_ID env variables");
  }

  let posts = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      [],
  );

  return posts.documents;
}

async function addPost(data: any) {
  if (!process.env.APPWRITE_COLLECTION_ID || !process.env.APPWRITE_DATABASE_ID) {
    throw new Error("Please set the APPWRITE_COLLECTION_ID and APPWRITE_DATABASE_ID env variables");
  }

  return await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      sdk.ID.unique(),
      data,
  );
}

export {getPost, addPost};