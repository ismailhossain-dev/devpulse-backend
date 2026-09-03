import dotenv from 'dotenv'

import path from 'path'

//env connect
dotenv.config({
    path: path.join(process.cwd(), '.env')
})


const config = {
    port: process.env.PORT,
    connnection_string:process.env.CONNECTION_STRING,
    jwt_secret: process.env.AUTH_SECRET,
    secret: process.env.SECRET

}

export default config; 