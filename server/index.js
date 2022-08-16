const express = require('express');
require('dotenv').config()
const router = require('./routes/user-routes');

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use('/api', router);


app.listen(port, () =>{
    console.log(`Server starts on port ${port}`)
})