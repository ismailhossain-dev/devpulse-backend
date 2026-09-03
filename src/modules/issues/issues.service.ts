import { pool } from "../../db";
import type { IIssue } from "./issues.interface"

const createIssuesIntoDB = async(payload: IIssue)=> {
    const {title, description, type} = payload;
    const result = await pool.query(`
        INSERT INTO issues(title, description, type) VALUES($1, $2, COALESCE($3, 'bug')) RETURNING * `, [title, description,type]
    );

    return result; 
}


export const issuesService ={
    createIssuesIntoDB
}