"use server";

import * as sdk from "node-appwrite";
import {revalidatePath} from "next/cache";
import {Query} from "node-appwrite";

const client = new sdk.Client();

// Determine if we are in a build phase
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

if (!isBuildPhase && (!process.env.APPWRITE_API_KEY || !process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_PROJECT_ID)) {
  // Only throw an error if not in build phase and env vars are missing
  throw new Error("Runtime Error: APPWRITE_API_KEY, APPWRITE_ENDPOINT, and APPWRITE_PROJECT_ID must be set.");
}

// Conditionally initialize client if variables are present (or if it's build phase, allow it to be uninitialized)
if (process.env.APPWRITE_ENDPOINT && process.env.APPWRITE_PROJECT_ID && process.env.APPWRITE_API_KEY) {
  client
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
    .setKey(process.env.APPWRITE_API_KEY) // Your secret API key
  ;
} else if (!isBuildPhase) {
  // If not in build phase and variables are still missing (e.g. one is missing), it's an issue.
  // This case might be redundant due to the check above but added for clarity.
  console.warn("Runtime Warning: Appwrite client could not be fully configured due to missing environment variables.");
}


const databases = new sdk.Databases(client);
// Note: Functions using 'databases' might fail if called during build and client is not configured.
// Further modifications within getPosts, getPost, addPost might be needed if they are called during build.

async function getPosts() {
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
  
  // If using dummy data (development mode), return mock posts
  if (process.env.APPWRITE_ENDPOINT === 'https://dummy.endpoint.com') {
    console.log("Using mock data for development");
    return [
      {
        $id: "1",
        name: "Nasi Gudeg Bu Sari",
        location: "Jl. Malioboro No. 123, Yogyakarta",
        image: null,
        category: "meals",
        description: "Authentic Javanese gudeg with tender jackfruit"
      },
      {
        $id: "2", 
        name: "Bakso Malang Pak Harto",
        location: "Jl. Veteran No. 45, Malang",
        image: null,
        category: "meals",
        description: "Famous Malang-style meatball soup"
      },
      {
        $id: "3",
        name: "Es Cendol Mbak Ita",
        location: "Jl. Pemuda No. 67, Surabaya", 
        image: null,
        category: "beverages",
        description: "Refreshing traditional cendol with coconut milk"
      },
      {
        $id: "4",
        name: "Sate Ayam Madura",
        location: "Jl. Diponegoro No. 89, Jakarta",
        image: null,
        category: "meals",
        description: "Authentic Madura chicken satay with peanut sauce"
      },
      {
        $id: "5",
        name: "Kerak Telor Betawi",
        location: "Jl. Kebon Jeruk No. 12, Jakarta",
        image: null,
        category: "snack",
        description: "Traditional Betawi spiced rice crust"
      },
      {
        $id: "6",
        name: "Rujak Buah Segar",
        location: "Jl. Raya Pantai No. 34, Bali",
        image: null,
        category: "snack",
        description: "Fresh fruit salad with spicy palm sugar dressing"
      }
    ];
  }
  
  if (!process.env.APPWRITE_DATABASE_ID || !process.env.APPWRITE_COLLECTION_ID) {
    if (!isBuildPhase) {
      throw new Error("Runtime Error: APPWRITE_DATABASE_ID and APPWRITE_COLLECTION_ID must be set.");
    }
    console.warn("Build Warning: APPWRITE_DATABASE_ID or APPWRITE_COLLECTION_ID not set for getPosts. Returning empty array.");
    return []; // Return empty array during build if IDs are missing
  }

  // Also, ensure client is somewhat configured before attempting to list documents
  if (!client.config.project && isBuildPhase) {
      console.warn("Build Warning: Appwrite client not configured for getPosts. Returning empty array.");
      return [];
  }

  let posts = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      [
        Query.limit(25),
        Query.offset(0)
      ]
  );

  return posts.documents;
}

async function getPost(id: string) {
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
  if (!process.env.APPWRITE_DATABASE_ID || !process.env.APPWRITE_COLLECTION_ID) {
    if (!isBuildPhase) {
      throw new Error("Runtime Error: APPWRITE_DATABASE_ID and APPWRITE_COLLECTION_ID must be set for getPost.");
    }
    console.warn(`Build Warning: APPWRITE_DATABASE_ID or APPWRITE_COLLECTION_ID not set for getPost(id: ${id}). Returning null.`);
    return null; // Return null or appropriate mock during build
  }

  if (!client.config.project && isBuildPhase) {
      console.warn(`Build Warning: Appwrite client not configured for getPost(id: ${id}). Returning null.`);
      return null;
  }

  return await databases.getDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      id
  );
}


async function addPost(data: any) {
  if (!process.env.APPWRITE_COLLECTION_ID || !process.env.APPWRITE_DATABASE_ID) {
    throw new Error("Please set the APPWRITE_COLLECTION_ID and APPWRITE_DATABASE_ID env variables");
  }

  await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      sdk.ID.unique(),
      data,
  );
  revalidatePath('/category');
  return;
}

export {
  getPosts,
  getPost,
  addPost
};