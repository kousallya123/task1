require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')



app.use(cors())
app.use(express.json())

app.use('/', require('./routes/userRouter'))
app.use('/admin', require('./routes/adminRouter'))


// DB CONNECTION

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('connected to mongodb');
})


// PORT INIT 

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is runing on port`, port);
})