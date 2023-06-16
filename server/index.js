const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const bodyparser = require('body-parser');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const app = express()
app.use(cors())
app.use(cookieparser())
app.use(bodyparser.json())
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.listen(4000,()=>{
    console.log('Server is running!')
})