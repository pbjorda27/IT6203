const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { MongoClient, ObjectId } = require('mongoose');
const port = 8000;
const mongoose = require('mongoose');
//specify where to find the schema
const Inspiration = require('./models/inspiration')
//specify where to find the schema
const Event = require("./models/events")
//specify where to find the schema
const Skill = require('./models/skill')
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
    
// CRUD operations
// Read
//find a event based on the id
app.get("/events/:id", (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Events.findOne())
    Event.findOne({ _id: req.params.id })
      //if data is returned, send data as a response
      .then((data) => {
        res.status(200).json(data);
        console.log(data);
      })
      //if error, send internal server error
      .catch((err) => {
        console.log("Error: ${err}");
        res.status(500).json(err);
      });
  });
  app.get("/events", (req, res, next) => {
    //call mongoose method find (MongoDB db.Students.find())
    Event.find()
      //if data is returned, send data as a response
      .then((data) => res.status(200).json(data))
      //if error, send internal server error
      .catch((err) => {
        console.log("Error: ${err}");
        res.status(500).json(err);
      });
  });
  
  // Create
  app.post("/events", (req, res, next) => {
    // create a new event variable and save request’s fields
    const event = new Event({
      eventTitle: req.body.eventTitle,
      eventDate: req.body.eventDate,
      eventLength: req.body.eventLength,
      eventTime: req.body.eventTime,
    });
    //send the document to the database
    event
      .save()
      //in case of success
      .then(() => {
        console.log("Success");
      })
      //if error
      .catch((err) => {
        console.log("Error:" + err);
      });
  });
  
  // Update
  app.put("/events/:id", (req, res, next) => {
    console.log("id: " + req.params.id);
    // check that the parameter id is valid
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      Event.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            eventTitle: req.body.eventTitle,
            eventDate: req.body.eventDate,
            eventLength: req.body.eventLength,
            eventTime: req.body.eventTime,
          },
        },
        { new: true }
      )
        .then((event) => {
          if (event) {
            //what was updated
            console.log(event);
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
  
  // Delete
  app.delete("/events/:id", (req, res, next) => {
    Event.deleteOne({ _id: req.params.id }).then((result) => {
      console.log(result);
      res.status(200).json("Deleted!");
    });
  });

  app.get('/skills', (req, res, next) => {
    // Call the mongoose method find (MongoDB db.Skills.find())
    Skill.find()
      // If data is returned, send data as a response 
      .then(data => res.status(200).json(data))
      // If error, send internal server error
      .catch(err => {
        console.log(`Error: ${err}`);
        res.status(500).json(err);
      });
  });
  
  // Create (Add)
  app.post('/api/skills', async (req, res) => {
    const newSkill = req.body; // Assuming the skill data is sent in the request body
    const client = new MongoClient(url, { useUnifiedTopology: true });
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const result = await db.collection('projects').insertOne(newSkill);
      res.json(result.ops[0]);
    } finally {
      await client.close();
    }
  });
  
  // Update
  app.put('/api/skills/:id', async (req, res) => {
    const skillId = req.params.id;
    const updatedSkill = req.body;
    const client = new MongoClient(url, { useUnifiedTopology: true });
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const result = await db
        .collection('projects')
        .updateOne({ _id: ObjectId(skillId) }, { $set: updatedSkill });
  
      if (result.modifiedCount === 1) {
        res.json({ message: 'Skill updated successfully' });
      } else {
        res.status(404).json({ message: 'Skill not found' });
      }
    } finally {
      await client.close();
    }
  });
  
  // Delete
  app.delete('/api/skills/:id', async (req, res) => {
    const skillId = req.params.id;
    const client = new MongoClient(url, { useUnifiedTopology: true });
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const result = await db.collection('projects').deleteOne({ _id: ObjectId(skillId) });
  
      if (result.deletedCount === 1) {
        res.json({ message: 'Skill deleted successfully' });
      } else {
        res.status(404).json({ message: 'Skill not found' });
      }
    } finally {
      await client.close();
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  //in the app.get() method below we add a path for the skills API 
//by adding /skills, we tell the server that this method will be called every time http://localhost:8000/skills is requested. 
app.get('/skills', (req, res, next) => {
  //call mongoose method find (MongoDB db.Skills.find())
Skill.find() 
//if data is returned, send data as a response 
.then(data => res.status(200).json(data))
//if error, send internal server error
.catch(err => {
console.log('Error: ${err}');
res.status(500).json(err);
});
});
//serve incoming post requests to /skills
app.post('/skills', (req, res, next) => {
 // create a new skill variable and save request’s fields 
const skill = new Skill({
   skill: req.body.skill,
   level: req.body.level
});
//send the document to the database 
skill.save()
   //in case of success
   .then(() => { console.log('Success');})
   //if error
   .catch(err => {console.log('Error:' + err);});
});
//:id is a dynamic parameter that will be extracted from the URL
app.delete("/skills/:id", (req, res, next) => {
   Skill.deleteOne({ _id: req.params.id }).then(result => {
       console.log(result);
       res.status(200).json("Deleted!");
   });
});
//serve incoming put requests to /skills 
app.put('/skills/:id', (req, res, next) => { 
   console.log("id: " + req.params.id) 
   // check that the parameter id is valid 
   if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
       //find a document and set new skill and level 
       Skill.findOneAndUpdate( 
           {_id: req.params.id}, 
           {$set:{ 
               skill : req.body.skill, 
               level : req.body.level 
           }}, 
           {new:true} 
       ) 
       .then((skill) => { 
           if (skill) { //what was updated 
               console.log(skill); 
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
//find a skill based on the id
app.get('/skills/:id', (req, res, next) => {
   //call mongoose method findOne (MongoDB db.Skills.findOne())
   Skill.findOne({_id: req.params.id}) 
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