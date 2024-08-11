"use server"

import * as sdk from "node-appwrite";
import {User} from "@/interface/user";
import {Query} from "node-appwrite";

const client = new sdk.Client();

if (!process.env.APPWRITE_API_KEY || !process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_PROJECT_ID) {
  throw new Error("Please set the APPWRITE_API_KEY, APPWRITE_ENDPOINT and APPWRITE_PROJECT_ID env variables");
}

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
    .setKey(process.env.APPWRITE_API_KEY) // Your secret API key

const databases = new sdk.Databases(client);

const searchStoreByName = async (keywords: string) => {
  if (!process.env.APPWRITE_COLLECTION_ID || !process.env.APPWRITE_DATABASE_ID) {
    throw new Error("Please set the APPWRITE_COLLECTION_ID and APPWRITE_DATABASE_ID env variables");
  }

  try {
    console.log(keywords);
    return await databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_ID,
        [
          Query.search("name", keywords)
        ]
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to search store");
  }
}

export {searchStoreByName};