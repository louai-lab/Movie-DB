const express = require('express');
const app = express();
const port = 5000;

//http://localhost:5000/

app.listen(port, () => {
    console.log("Server ready")
});


// app.all('*', (req, res) => {
//     res.send('OK');
//   });

/* step 3 */

app.get('/test', (req, res) => {
    res.json({ status: 200, message: "ok" })
})

app.get('/time', (req, res) => {

    const today = new Date();

    var time = today.getHours() + ":" + today.getMinutes();

    res.json({ status: 200, message: time })
})

/* step 4 */

app.get("/hello/:Id", (req, res) => {
    if (req.params.Id != undefined) {
        res.json({ status: 200, message: req.params.Id })
    }
    else {
        res.json({ status: 200, message: " " })
    }
})

app.get("/search", (req, res) => {
    if (typeof req.query.s != "undefined") {
        res.status(200).send("ok , data : " + req.query.s);
    } else {
        res.status(500).send("you have to provide a search");
    }
});

/* step 5 */

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 }, 
    { title: 'Avatar', year: 2009, rating: 7.8 }, 
    { title: 'Brazil', year: 1985, rating: 8 }, 
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }]


// app.get("/movies/create", (req, res) => {

// });

app.get("/movies/read", (req, res) => {
    res.json({status:200,data:movies})
});

// app.get("/movies/update", (req, res) => {

// });

// app.get("/movies/delete", (req, res) => {

// });

/* step 6 */

app.get('/movies/read/by-date',(req,res)=>{
    res.json({status:200,data:movies.sort((a, b) => a.year - b.year)})
})

app.get('/movies/read/by-rating',(req,res)=>{
    res.json({status:200,data:movies.sort((a, b) => b.rating - a.rating)})
})

app.get('/movies/read/by-title',(req,res)=>{
    res.json({status:200,data:movies.sort((a,b)=>a.title.localeCompare(b.title))})
})


/* step 7 */

app.get('/movies/read/id/:id',(req,res)=>{
    

    if(req.params.id > movies.length){
        res.json({status:404,error:true,message:`the movie ${req.params.id} does not exist`})
    }
    else{
        res.json({status:200,data:movies[req.params.id-1]})
    }
})
