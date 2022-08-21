global.clientId = "306ded07-aaeb-4962-8f0c-a8afc7423802";
global.clientSecret = "913aa69c822a1181a87ba5b8ca97adc4";
global.myStorage = __dirname;
global.convertApi = conversion_cloud.ConvertApi.fromKeys(clientId, clientSecret);
const express = require("express");
const app=express();
const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({extended: true}));
//const config = new groupdocs_conversion_cloud.Configuration(clientId, clientSecret);
config.apiBaseUrl = "https://api.groupdocs.cloud";


app.listen(3000, function(){
  console.log("server is running at 3000");
});

app.get("/docs", function(req,res){
  res.send("working");
});

app.post("/docs", function(req,res){
  var reqfile= req.body.file;
  fs.readFile(resourcesFolder, (err, fileStream) => {
    // construct FileApi
    var fileApi = groupdocs_conversion_cloud.FileApi.fromConfig(config);
    // create upload file request
    var request = new groupdocs_conversion_cloud.UploadFileRequest("sample.pdf", fileStream, myStorage);
    // upload file
    fileApi.uploadFile(request);
  });
  let convertApi = groupdocs_conversion_cloud.ConvertApi.fromKeys(clientId, clientSecret);

  // define convert settings
  let settings = new groupdocs_conversion_cloud.ConvertSettings();
  settings.filePath = reqfile; // input file path on the cloud
  settings.format = "docx";         // output format
  settings.outputPath = "converted";   // output file folder on the cloud

  // create convert document request
  //let request = new groupdocs_conversion_cloud.ConvertDocumentRequest(settings);

  // convert document
  let result = await convertApi.convertDocument(new conversion_cloud.ConvertDocumentRequest(settings));
  //let result = await convertApi.convertDocument(request);
  console.log("Document converted successfully: " + result[0].url);
  var findoc=result;

  var fileApi = groupdocs_conversion_cloud.FileApi.fromConfig(config);

  // create download file request
  let request = new groupdocs_conversion_cloud.DownloadFileRequest("output"+reqfile, myStorage);

  // download file
  let response = await fileApi.downloadFile(request);

  // save file in your working directory
  fs.writeFile(__dirname, response, "binary", function (err) { });
  console.log(response);
res.send(response);


})







/
