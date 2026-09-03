import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issuesService } from "./issues.service";
import type { IUser } from "./issues.interface";

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
      data: result,
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
const deleteSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Invalid Issue id!!",
    });
  }
  try {
    const result = await issuesService.deleteSingleIssueFromDB(id as string);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Issue deleted successfully",
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


const updateIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await issuesService.updateIssueIntoDB(
      id as string,
      req.body,
      req.user
    );

    console.log("controller.ts:", req.user);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};



export const issuesController = {
  createIssues,
  getAllIssues,
  getSingleIssue,
  deleteSingleIssue,
  updateIssue
};
