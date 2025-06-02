import {Client, Account} from 'appwrite';

const client = new Client();

const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

if (!isBuildPhase && (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || !process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)) {
  throw new Error("Runtime Error: NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID must be set.");
}

if (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT && process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
} else if (!isBuildPhase) {
  console.warn("Runtime Warning: Client-side Appwrite client could not be fully configured due to missing public environment variables.");
}


export const account = new Account(client);
export {ID} from 'appwrite';