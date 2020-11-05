const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = process.argv.slice(2);
let hostAddress = input[0];
let filePath = input[1];

const request = require('request');

request(hostAddress, (error, response, body) => {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage
  if (error) {
    console.log ("URL is incorrect! and is resulting in an error");
    process.exit()
  }
  else {
    fs.writeFile(filePath, body, (err) => {
      if (fs.readFile(filePath, (err) => {
        console.log("File already exists");
        rl.question("Type in Y and press enter to overwrite the file: ", (answer) => {
          output = `${answer}`;
          if (output === "Y") {
            fs.writeFile(filePath, body, (err) => {
              console.log(err); 
              let fileSize = fs.statSync(filePath);
              let fileSizeBytes = fileSize["size"];
              console.log("Downloaded and saved " +  fileSizeBytes + " bytes to " + filePath);
            });
          }
          console.log('Skipped! App is existing...')
          rl.close();
        })
      }));
    
      let fileSize = fs.statSync(filePath);
      let fileSizeBytes = fileSize["size"];
      console.log("Downloaded and saved " +  fileSizeBytes + " bytes to " + filePath);
    });
  }

});




