import { Router } from "express";
import { issuesController } from "./issues.controller";
import { USER_ROLE } from "../../types";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", issuesController.createIssues);
router.get("/", issuesController.getAllIssues);
router.get("/:id", issuesController.getSingleIssue);
router.patch(
  "/:id",
  auth("maintainer"),
  issuesController.updateIssue,
);
router.delete("/:id", issuesController.deleteSingleIssue);
export const issuesRoute = router;
