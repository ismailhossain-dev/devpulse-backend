import express, { type Request, type Response } from "express"
import cookieParser from "cookie-parser"
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



export default app; 