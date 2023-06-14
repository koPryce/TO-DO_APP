const express = require("express");
const app = express();
app.use(express.static("public"));

app.use('/fontawesome', express.static(__dirname + '/fontawesome'));


const port = 3000;
app.listen(port, () => { 
  console.log(`Server is running on port ${port}`);
});
