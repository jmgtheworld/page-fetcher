const fs = require('fs');

const input = process.argv.slice(2);
let hostAddress = input[0];
let filePath = input[1];

const request = require('request');

request(hostAddress, (error, response, body) => {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.

  fs.writeFile(filePath, body, (err) => {
    console.log(err);
    let fileSize = fs.statSync(filePath);
    let fileSizeBytes = fileSize["size"];
    console.log("Downloaded and saved " +  fileSizeBytes + " bytes to " + filePath);
  })

  
});



