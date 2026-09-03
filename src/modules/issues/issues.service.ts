import { pool } from "../../db";
import type { IIssue, IUpdateIssue } from "./issues.interface";

const createIssuesIntoDB = async (payload: IIssue) => {
  const { reporter_id, title, description, type } = payload;
  const result = await pool.query(
    `
        INSERT INTO issues(reporter_id, title, description, type) VALUES($1, $2, $3, COALESCE($4, 'bug')) RETURNING * `,
    [reporter_id, title, description, type],
  );

  return result;
};

const getAllIssuesFromDB = async (query: {
  sort?: string;
  type?: string;
  status?: string;
}) => {
  const { sort = "newest", type, status } = query;

  let sql = `
    SELECT
      i.id,
      i.title,
      i.description,
      i.type,
      i.status,
      i.reporter_id,
      i.created_at,
      i.updated_at
    FROM issues i
  `;

  const values: string[] = [];
  const conditions: string[] = [];

  // type filter
  if (type) {
    values.push(type);
    conditions.push(`i.type = $${values.length}`);
  }

  // status filter
  if (status) {
    values.push(status);
    conditions.push(`i.status = $${values.length}`);
  }

  // WHERE condition
  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  // sorting
  if (sort === "oldest") {
    sql += ` ORDER BY i.created_at ASC`;
  } else {
    sql += ` ORDER BY i.created_at DESC`;
  }

  const result = await pool.query(sql, values);

  // reporter data
  const issues = await Promise.all(
    result.rows.map(async (issue) => {
      const reporterResult = await pool.query(
        `
        SELECT id, name, role
        FROM users
        WHERE id = $1
        `,
        [issue.reporter_id],
      );

      return {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,
        reporter: reporterResult.rows[0],
        created_at: issue.created_at,
        updated_at: issue.updated_at,
      };
    }),
  );

  return issues;
};

const getSingleIssueFromDB = async (id: string) => {
  const issueResult = await pool.query(
    `
      SELECT *
      FROM issues
      WHERE id = $1
    `,
    [id],
  );

  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  const reporterResult = await pool.query(
    `
      SELECT id, name, role
      FROM users
      WHERE id = $1
    `,
    [issue.reporter_id],
  );

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reporterResult.rows[0],
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};


const updateIssueIntoDB = async (
  id: string,
  payload: IUpdateIssue,
  user: {
    id: number;
    role: string;
  }
) => {
  // find issue
  const issueResult = await pool.query(
    `
      SELECT *
      FROM issues
      WHERE id = $1
    `,
    [id]
  );

  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  // maintainer can update any issue
  if (user.role === "maintainer") {
    // allowed
  }

  // contributor can update only own issue
  // and only when status is open
  else if (user.role === "contributor") {
    if (issue.reporter_id !== user.id) {
      throw new Error("You can only update your own issue");
    }

    if (issue.status !== "open") {
      throw new Error("You can only update an open issue");
    }
  }

  // other roles are not allowed
  else {
    throw new Error("You are not authorized");
  }

  const { title, description, type } = payload;

  // update issue
  const result = await pool.query(
    `
      UPDATE issues
      SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        type = COALESCE($3, type),
        updated_at = NOW()
      WHERE id = $4
      RETURNING *
    `,
    [title, description, type, id]
  );

  return result.rows[0];
};

const deleteSingleIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `
      DELETE FROM issues
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );
  return result;
};

export const issuesService = {
  createIssuesIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  deleteSingleIssueFromDB,
  updateIssueIntoDB
};
