//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;




// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route
app.get('/', (req, res) => {
  res.sendFile(__dirname+ '/public/index.html');
});

// Define a post rout which serves secret.html if password is correct
app.post('/check', (req, res) => {
    let passwordIsCorrect=req.body.password==="ILoveProgramming"
    res.sendFile(__dirname+ '/public/'+(passwordIsCorrect?'secret.html':'index.html'));
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
