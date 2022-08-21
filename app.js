const express = require("express");
const bodyParser = require("body-parser");
const libre = require('libreoffice-convert');
const fs = require("fs");
const path = require("path");
var outputFilePath;
const multer = require("multer");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, function(){
  console.log("server is running");
})

app.use(express.static("public"));
/

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


app.get('/docs',(req,res) => {
  res.sendFile(__dirname+ "/index.html");
  res.render({title:"DOCX to PDF Converter - Free Media Tools"})
})

const docxtopdfdemo = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".docx" &&
    ext !== ".doc"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

const docxtopdfdemoupload = multer({storage:storage,fileFilter:docxtopdfdemo})


app.post('/docs',docxtopdfdemoupload.single('file'),(req,res) => {
  if(req.file){
    console.log(req.file.path)

    const file = fs.readFileSync(req.file.path);

    outputFilePath = Date.now() + "output.pdf"

    libre.convert(file,".pdf",undefined,(err,done) => {
      if(err){
        fs.unlinkSync(req.file.path)
        fs.unlinkSync(outputFilePath)

        res.send("some error taken place in conversion process")
      }

      fs.writeFileSync(outputFilePath, done);

      res.download(outputFilePath,(err) => {
        if(err){
          fs.unlinkSync(req.file.path)
        fs.unlinkSync(outputFilePath)

        res.send("some error taken place in downloading the file")
        }

        fs.unlinkSync(req.file.path)
        fs.unlinkSync(outputFilePath)
      })


    })
  }
})




// const libre = require('libreoffice-convert');
//
// const path = require('path');
// const fs = require('fs');
//
// const extend = '.pdf'
// const FilePath = path.join(__dirname, './word_file.docx');
// const outputPath = path.join(__dirname, `./example${extend}`);
//
// // Read file
// const enterPath = fs.readFileSync(FilePath);
// // Convert it to pdf format with undefined filter (see Libreoffice doc about filter)
// libre.convert(enterPath, extend, undefined, (err, done) => {
//     if (err) {
//       console.log(`Error converting file: ${err}`);
//     }
//
//     // Here in done you have pdf file which you can save or transfer in another stream
//     fs.writeFileSync(outputPath, done);
// });


// 3PvMHgE%LbG?Y^W




// client id--306ded07-aaeb-4962-8f0c-a8afc7423802
// client secret--913aa69c822a1181a87ba5b8ca97adc4
