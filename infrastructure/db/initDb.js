import { pool } from "./index.js";

export async function initializeDatabase(retries = 10, delay = 2000){
    while (retries) {
        try {
    await pool.query( `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
    `);
    console.log("Users table is ready.");
    break;
    } catch (error) {
        console.error(" Waiting for DB... retries left:", retries-1)
        console.error("Error", error.message);
        retries--;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    }

    if (retries === 0) {
        console.error("Failed to initialize database");
        process.exit(1);
    }

}