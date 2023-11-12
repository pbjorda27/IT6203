const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const inspirationSchema = new mongoose.Schema({
    inspiration:  { type: String, required: true},
    keyword1:  { type: String, required: true},
    keyword2:  { type: String, required: true},
    keyword3:  { type: String, required: true}
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('inspiration', inspirationSchema,'inspiration');
//note capital S in the collection name