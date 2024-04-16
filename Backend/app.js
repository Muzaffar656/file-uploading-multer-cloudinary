import express, { urlencoded } from 'express'
import multer from 'multer'
import path  from 'path'
// new
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dlinbaowa', 
  api_key: '811992712136645', 
  api_secret: 'rpCZ7kD4XR03pXq3xtGvtQBcqRE' 
});


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
       return cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
       return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage:storage})
app.use(express.urlencoded({extended:false}))

app.post('/uploadimage',upload.single('file'),async(req,res)=>{
    const files = req.file
    const filename =files.filename
    const filepath = path.resolve(__dirname,'./uploads',filename)
  const result = await  cloudinary.uploader.upload(filepath)
    console.log('done')
})

app.post('/multiplefiles',upload.fields([{name:"file",},{name:"file2"}]),(req,res)=>{
console.log(req.files)   // when you upload multiple file use files not file
})

app.get('/',(req,res)=>{
    res.send(`${`file uploadin using multer and Cloudinary`}`)
})

app.listen(5000,()=>{
    console.log('server lisning on port : 5000')
})