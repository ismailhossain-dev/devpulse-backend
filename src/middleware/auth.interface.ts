export interface IJwtPayload {
  id: number;
  name: string;
  email: string;
  role: "contributor" | "maintainer";
}