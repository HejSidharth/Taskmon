import { Client, Databases, Account } from "appwrite";

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6580cc87b0ebb3a4fe8f');

export const account = new Account(client);
export const databases = new Databases(client);


