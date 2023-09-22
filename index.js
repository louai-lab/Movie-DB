const express = require('express');
const app = express();
const port=5000;

app.listen(port, () => {
    console.log("Server ready")
});


app.all('*', (req, res) => {
    res.send('OK');
  });

