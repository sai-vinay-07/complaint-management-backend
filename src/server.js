const cookieParser = require("cookie-parser");
const cors = require('cors');
const express = require('express');
const { connectDB } = require('./config/db')
const authRouter = require('./routes/auth.routers')
const userRouter = require('./routes/user.routers')
const complaintRouter = require('./routes/complaint.router')
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: '*' }));


app.use('/api/auth', authRouter)
app.use('/api/users',userRouter)
app.use('/api/complaints',complaintRouter)

const port = process.env.PORT || process.env.port || 8082;

const startServer = async () => {
    try {
        await connectDB()
        console.log('MongoDB Connected!')

        app.listen(port, () => {
            console.log(`Server is running on the port ${port}`)
        })

    } catch (error) {
        console.error(error)
    }
}

startServer()
