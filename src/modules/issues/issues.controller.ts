import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issuesService } from "./issues.service";

const createIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.createIssuesIntoDB(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      success: false,
      statusCode: 500,
      message: error.message,
      error: error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.getAllIssuesFromDB(
      req.query as {
        sort?: string;
        type?: string;
        status?: string;
      },
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Issues retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      success: false,
      statusCode: 500,
      message: error.message,
      error,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Invalid Issue id!!",
    });
  }

  try {
    const result = await issuesService.getSingleIssueFromDB(id as string);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Issue retrived successfully",
      data: result
    });
  } catch (error: any) {
    sendResponse(res, {
      success: false,
      statusCode: 500,
      message: error.message,
      error: error,
    });
  }
};

export const issuesController = {
  createIssues,
  getAllIssues,
  getSingleIssue,
};
