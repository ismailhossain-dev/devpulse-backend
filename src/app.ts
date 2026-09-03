import express, { type Request, type Response } from "express"
import cookieParser from "cookie-parser"
import { useRoute } from "./modules/users/users.route";
import globallErrorHandler from "./middleware/globallErrorHandler";
import { authRoute } from "./modules/auth/auth.route";
import { issuesRoute } from "./modules/issues/issues.route";
const app = express()
app.use(cookieParser())
app.use(express.json()); 
app.use(express.text()); 
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req:Request, res:Response) => {
 res.status(200).json({
    message: "DevPulse Backend",
    author: "Sabbir"
 })
})

app.use("/api/auth/signup", useRoute);
app.use("/api/auth/login", authRoute);
app.use("/api/issues", issuesRoute);
app.use("/api/issues", issuesRoute);
app.use("/api/issues", issuesRoute);
app.use("/api/issues", issuesRoute);
app.use("/api/issues", issuesRoute);

app.use(globallErrorHandler);

export default app; 