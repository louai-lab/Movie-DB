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
    res.json({status:200, message:"ok"})
})

app.get('/time',(req,res)=>{

    const today = new Date();

    var time = today.getHours() + ":" + today.getMinutes();

    res.json({status:200, message:time})
})

/* step 4 */

app.get("/hello/:Id", (req, res)=>{
    if(req.params.Id != undefined){
        res.json({status:200,message:req.params.Id})
    }
    else{
        res.json({status:200,message:""})
    }
})

app.get("/search", (req, res) => {
    if (typeof req.query.s != "undefined") {
      res.status(200).send("ok , data : " + req.query.s);
    } else {
      res.status(500).send("you have to provide a search");
    }
  });

