import {Client, Account, OAuthProvider} from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66b73b090027ba4b000a');


export const account = new Account(client);
export {ID} from 'appwrite';