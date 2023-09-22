const express = require('express');
const app = express();
const port=5000;

//http://localhost:5000/

app.listen(port, () => {
    console.log("Server ready")
});


// app.all('*', (req, res) => {
//     res.send('OK');
//   });

/* step 3 */

app.get('/test',(req,res) =>{
    res.status(200).send('ok')
})

app.get('/time',(req,res)=>{

    const today = new Date();

    var time = today.getHours() + ":" + today.getMinutes();

    res.status(200).send(time)
})

