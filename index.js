const express = require('express');
const bodyParser=require('body-parser'); // // Middleware for parsing request bodies
const mongoose = require('mongoose');

const {auth} = require('./middlewares');

const app = express();

// Middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

////// step 12 starts

  const dbUrl =
  'mongodb+srv://louaibaghdadi27:40wonTrYtXGOxTIv@cluster0.tafekgj.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB using async/await
(async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);

    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

////// step 12 ends



//http://localhost:5000/

// app.listen(port, () => {
//     console.log("Server ready");
// });


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
    

    if(req.params.id > movies.length || id < 1){
        res.json({status:404,error:true,message:`the movie ${req.params.id} does not exist`})
    }
    else{
        res.json({status:200,data:movies[req.params.id-1]})
    }
})

/* step 8  + step 11 */

app.get('/movies/add',(req,res)=>{
    
    let rating=parseInt(req.query.rating);

    if(req.query.title === "" || isNaN(req.query.year) || req.query.year.length != 4){
        res.json({status:403,error:true,message:'you cannot create a movie without providing a title and a year'});
    }else if (isNaN(rating) || rating > 10) {
        rating = 4;
    }

    const newMovie={
        title:req.query.title,
        year:req.query.year,
        rating:rating
    }

    movies.push(newMovie)

    res.json({status:200,data:movies});
})

app.post("/movies/add", (req, res) => {

      let title=req.body.title;
      let year=req.body.year;
      let rating=parseInt(req.body.rating);



      if(title === "" || isNaN(year)){
        res.json({status:404,error:true,message:'you cannot create'});
      }
      else if(isNaN(rating) || rating > 10){
        rating = 4;
      }

      const newMovie={
        title:title,
        year:year,
        rating:rating
      };

      movies.push(newMovie);
      res.json({status:200,data:movies});
    });

/* step 9   + step 11*/

app.get('/movies/delete/:id',(req,res)=>{
    let id=req.params.id

    if(id > movies.length || id < 1){
        res.json({status:404,error:true,message:`the movie ${id} does not exist`})
    }
    else{
        movies.splice(id,1)
        res.json({status:200,data:movies});
    }
})

app.delete('/movies/delete/:id',(req,res) =>{
    let id =req.params.id;

    if( id > movies.length || id < 1){
        res.json({status:404,error:true,message:`the movie ${id} does not exist`})
    }
    else{
        movies.splice(id-1,1);
        res.json({status:200,data:movies});
    }
})

/* step 10  + step 11 */

app.get('/movies/update/:id',(req,res)=>{
    let id=req.params.id;

    movies[id-1].title = req.query.title;
    movies[id-1].rating = req.query.rating;

    res.json({status:200,data:movies})
})

app.put('/movies/update/:id',(req,res)=>{
    let id=req.params.id;

    if(id > movies.length || id < 1){
        res.json({status:404,error:true,message:`the movie ${id} does not exist`})
    }

    else if(req.body.title === "" || isNaN(req.body.year) || isNaN(req.body.rating)){
        res.json({status:200,error:true,message:"enter the title , year and rating"})
    }

    else{
        movies[id-1].title = req.body.title;
        movies[id-1].year = req.body.year;
        movies[id-1].rating = req.body.rating;

        res.json({status:200,data:movies})
    }

})

/* step 12 */

const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    year:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    }
  });
  
  const Movie = mongoose.model("Movie",movieSchema);

app.post('/movies',auth,(req,res)=>{
    const movie = new Movie({
        title:req.body.title,
        year:req.body.year,
        rating:req.body.rating
    })

    movie.save().then(
        () => res.json({status:200,message:"added successfully"}),
        (error) => res.json({status:404,error:true,message:"error"})
    )
})

app.get('/movies',auth,async (req, res) => {

    try {
      const allData = await Movie.find({}); 
      res.json({status:200,data:allData}); 
    } catch (error) {
      console.error('Error fetching data:', error);
      res.json({status:200,error:true,message:"there is an error"})
    }
  });

app.put('/movies/:id', auth,async (req, res) => {
    const id = req.params.id; 

    try{
        await Movie.findByIdAndUpdate(id,{$set:req.body});

        if(Movie.findByIdAndUpdate()){
            res.json({status:200,message:"updated successfully"})
        }
        else{
            res.json({status:404,error:true,message:"error"})
        }

    } catch(err){
        res.json({status:404,error:true,message:"big error"})
    }
});

app.delete('/movies/:id',auth,async(req,res)=>{
    const id = req.params.id; 

    try{
        await Movie.findByIdAndRemove(id);

        if(Movie.findByIdAndRemove()){
            res.json({status:200,message:"removed successfully"})
        }
        else{
            res.json({status:404,error:true,message:"error"})
        }

    } catch(err){
        res.json({status:404,error:true,message:"big error"})
    }
})


/* step 13 */






  





