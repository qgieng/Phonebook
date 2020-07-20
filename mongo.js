const mongoose = require('mongoose');

if( process.argv.length< 3){
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}
const password = process.argv[2];
const DB_NAME = 'phonebook-app';
const url =`mongodb+srv://user_qgieng:${password}@cluster0.m3bt3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority` ;




const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if(process.argv.length === 3){

  mongoose.connect(url,
    { useNewUrlParser:true,
      useUnifiedTopology:true }
  );

  console.log('phonebook:');
  Person.find({}).then(results => {
    results.forEach( person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
if(process.argv.length === 5){

  mongoose.connect(url,
    { useNewUrlParser:true,
      useUnifiedTopology:true }
  );
  const Person = mongoose.model('Person', personSchema);

  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  newPerson.save().then(result => {
    console.log(`added  ${result.name} ${result.number} to phonebook `);
    mongoose.connection.close();
  });
}

