import { Pool } from "pg";
import config from "../config";
export const pool = new Pool({
connectionString : config.connnection_string
})


export const initDB  =async ()=> {
    console.log("database connectend successfully!")
}