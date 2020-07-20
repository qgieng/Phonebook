const mongoose  = require('mongoose');
const config = require('../utils/config.js')
const mongooseUniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const PersonSchema = new mongoose.Schema({
    name: {
        type:String,
        unique:true,
        required:true,
        minlength:3
    },
    number: {
        type:String,
        required:true,
        minlength:9
    },
    id: String
})

PersonSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

PersonSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Person', PersonSchema)