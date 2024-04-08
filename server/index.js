const express = require('express')
const cors = require('cors')
const {connect} = require('mongoose')
require('dotenv').config()
const upload = require('express-fileupload')
const multer = require('multer')

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const {notFound,errorHandler} = require('./middleware/errorMiddleware')

const app = express();
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
app.use(notFound)
app.use(errorHandler)
connect(process.env.MONGO_URI).then(app.listen(5000, ()=> console.log(`running at ${process.env.PORT}`))).catch(error => {console.log(error)})

const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const uploadd = multer({storage:storage})
app.use("/api/upload",uploadd.single('file'),(req,res)=>{
    res.status(200).json("image done")
})