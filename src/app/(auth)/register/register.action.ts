"use server"

import * as sdk from "node-appwrite";
import {User} from "@/interface/user";

const client = new sdk.Client();

if (!process.env.APPWRITE_API_KEY || !process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_PROJECT_ID) {
  throw new Error("Please set the APPWRITE_API_KEY, APPWRITE_ENDPOINT and APPWRITE_PROJECT_ID env variables");
}

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
    .setKey(process.env.APPWRITE_API_KEY) // Your secret API key

const account = new sdk.Account(client);

const registerNewUser = async (data: User) => {
  if (!process.env.APPWRITE_COLLECTION_ID || !process.env.APPWRITE_DATABASE_ID) {
    throw new Error("Please set the APPWRITE_COLLECTION_ID and APPWRITE_DATABASE_ID env variables");
  }

  try {
    console.log(data);
    return await account.create(
        sdk.ID.unique(),
        data.email,
        data.password,
        data.name
    );
    // After successfully creating the user, send a verification email
    await account.createVerification(`${process.env.NEXT_PUBLIC_APP_URL}/verify-email`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to register new user");
  }
}

export {registerNewUser};