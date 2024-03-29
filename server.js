const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

const fs = require('fs');
const uploadDirectory = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

app.use('/assets', express.static(__dirname + '/assets/'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

//Router Principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/upload', upload.single('arquivo'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const err = new Error('Por favor selecione um arquivo')
        err.httpStatusCode = 400
        return next(err)
    }
    res.sendFile(__dirname + '/upload.html')
})

app.listen(port, () => {
    console.log(`Servidor rodando na port ${port}`)
})