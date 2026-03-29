import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Manually point to the file since it's in the root
dotenv.config({ path: ".env" });  

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in .env file');
}

export default defineConfig({
    schema: './src/db/schema/index.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});
