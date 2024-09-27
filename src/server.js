import express from "express"
import "dotenv/config"
import path from "node:path"
import { fileURLToPath } from "node:url"
import multer from "multer"

//rotas
import './routes/userRouter.js'
import './routes/postRouter.js'

const PORT = process.env.PORT || 3333

const app = express()
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicFolder = path.resolve(__dirname, "../public")

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, publicFolder)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})
  
app.listen(PORT)