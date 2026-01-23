const cookieParser = require("cookie-parser");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { connectDB } = require('./config/db')
const authRouter = require('./routes/auth.routers')
const userRouter = require('./routes/user.routers')
const evidenceRouter = require('./routes/evidenceRoutes')
const complaintRouter = require('./routes/complaint.router')
const app = express();
const fs = require('fs');
const path = require('path');


app.use(cookieParser());
app.use(express.json());
app.use(cors({origin:'*'
}));



app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/complaints', complaintRouter)
app.use('/api/evidence', evidenceRouter)
app.use("/uploads", express.static("uploads"));



app.use((err, req, res, next) => {
    if (err.name === 'MulterError') {
        return res.status(400).json({ message: err.message, field: err.field });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.get('/',()=>{
    res.send('It works in browser.')
})

const port = process.env.PORT || process.env.port || 8082;

const startServer = async () => {
    try {
        await connectDB()
        console.log('MongoDB Connected!')

        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
            console.log("Created 'uploads' directory");
        }

        app.listen(port, () => {
            console.log(`Server is running on the port ${port}`)
        })

    } catch (error) {
        console.error(error)
    }
}

startServer()
