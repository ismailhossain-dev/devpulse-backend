export interface IIssue {
    title: string,
    description: string,
    type :string,
    reporter_id: number
}


export type IUser = {
    id: string;
    name: string;
    email: string;
    role: string;
}


export interface IUserFromDB {
    id: string;
    name: string;
    role: string;
}

export type IIssueQuery = {
    sort?: "newest" | "oldest";
    type?: string;
    status?: string;
}

export interface IUpdateIssue {
  title?: string;
  description?: string;
  type?: "bug" | "feature_request";
}