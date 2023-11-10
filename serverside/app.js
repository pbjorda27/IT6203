const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
//specify where to find the schema
const Inspiration = require('./models/inspiration')
//connect and display the status 
mongoose.connect('mongodb+srv://IT6203Group4:IT6203Group4@cluster0.yljwyos.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => { console.log("connected"); })
     .catch(() => { console.log("error connecting"); });
//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
     console.log('This line is always called');
     res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
     res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
     next();
 });
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())
// in the app.get() method below we add a path for the inspiration API 
// by adding /inspiration, we tell the server that this method will be called every time http://localhost:8000/inspiration is requested. 

// Search by Keywords
app.get('/inspiration/search', (req, res, next) => {
    const keyword1 = req.query.keyword1;
    const keyword2 = req.query.keyword2;
    const keyword3 = req.query.keyword3;

    console.log('Received keywords:', { keyword1, keyword2, keyword3 }); // Log received keywords
  
    Inspiration.find({
      $or: [
        { keyword1: keyword1 },
        { keyword2: keyword2 },
        { keyword3: keyword3 }
      ]
    })
    .then(data => {
        console.log('Search results:', data); // Log search results
        res.status(200).json(data);
    })
      .catch(err => {
        console.log(`Error: ${err}`);
        res.status(500).json(err);
      });
  });

app.get('/inspiration', (req, res, next) => {
   //call mongoose method find (MongoDB db.Inspiration.find())
 Inspiration.find() 
 //if data is returned, send data as a response 
 .then(data => res.status(200).json(data))
 //if error, send internal server error
 .catch(err => {
 console.log('Error: ${err}');
 res.status(500).json(err);
 });
 });
//serve incoming post requests to /inspiration
app.post('/inspiration', (req, res, next) => {
    // create a new inspiration variable and save request’s fields 
    const inspiration = new Inspiration({
        inspiration: req.body.inspiration,
        keyword1: req.body.keyword1,
        keyword2: req.body.keyword2,
        keyword3: req.body.keyword3
    });
    //send the document to the database 
    inspiration.save()
        //in case of success
        .then(() => { console.log('Success'); })
        //if error
        .catch(err => { console.log('Error:' + err); });
});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/inspiration/:id", (req, res, next) => {
    Inspiration.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

//serve incoming put requests to /inspiration 
app.put('/inspiration/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new inspiration and keyword names 
        Inspiration.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                inspiration : req.body.inspiration, 
                keyword1 : req.body.keyword1,
                keyword2 : req.body.keyword2,
                keyword3 : req.body.keyword3
            }}, 
            {new:true} 
        ) 
        .then((inspiration) => { 
            if (inspiration) { //what was updated 
                console.log(inspiration); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

//find a inspiration based on the id
app.get('/inspiration/:id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Inspiration.findOne())
    Inspiration.findOne({_id: req.params.id}) 
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});
     

//to use this middleware in other parts of the application
module.exports = app;