const express = require('express');
require('dotenv').config()
const userRouter = require('./routes/user-routes');
const playlistRouter = require('./routes/playlist-routes');
const taskRouter = require('./routes/task-routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error-middleware')

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api/user', userRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/task', taskRouter);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server starts on port ${port}`)
})