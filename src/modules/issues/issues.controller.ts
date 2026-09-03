import type { Request, Response } from "express"
import sendResponse from "../../utility/sendResponse"
import { issuesService } from "./issues.service"

const createIssues = async(req:Request ,res:Response)=> {
    try {
        const result = await issuesService.createIssuesIntoDB(req.body)
        sendResponse(res, {
            success: true,
            statusCode:201,
            message: "Issue created successfully",
            data: result.rows[0]
        })
    } catch (error:any) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: error.message,
            error: error
        })
    }
}


export const issuesController = {
    createIssues
}