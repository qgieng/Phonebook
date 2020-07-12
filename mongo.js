const mongoose = require('mongoose');

if(process.argv.length< 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2];
const db_name = '';
const url =`mongodb+srv://user_qgieng:${password}@cluster0.m3bt3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    person: String,
    number: String
})

mongoose.connect(url,
    {useNewUrlParser:true, 
        useUnifiedTopology:true}
);

const Person = mongoose.model('Person', personSchema);

if(process.argv.lenth === 3){
    
    Person.find({}).then(results=>{
        results.forEach( person=>{
            console.log(person);
        })
        mongoose.connection.close();
    })
}

