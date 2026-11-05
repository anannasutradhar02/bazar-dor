
import dns from "node:dns";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

// Use Google DNS for MongoDB SRV lookup
dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("Google DNS configured:", dns.getServers());

if (!process.env.DATABASE_URI) {
  throw new Error("Missing DATABASE_URI in environment variables");
}

const client = new MongoClient(process.env.DATABASE_URI);
const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});
