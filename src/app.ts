import express, { type Request, type Response } from "express"
const app = express()
const port = 5000

app.get('/', (req:Request, res:Response) => {
 res.status(200).json({
    message: "DevPulse Backend",
    author: "Sabbir"
 })
})



export default app; 