require('dotenv').config();
const http = require('http');
const express = require('express');
const { response } = require('express');
const cors  = require('cors');
const app = express();
var morgan = require('morgan');
const Person = require('./models/person');


morgan.token('bodydata', (req,res)=>{
    return JSON.stringify(req.body);
})

app.use(cors());
app.use(express.static('build'))
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodydata'));
app.use(express.static('build'));



app.get('/api/persons',
                        (request,response)=>{
    Person.find({}).then(persons=>{
        response.json(persons)
    })
})

app.get('/api/persons/:id',
            (request,response,next)=>{
    Person.findById(request.params.id).then(returnedPersons=>{
        if(returnedPersons)
            response.json(returnedPersons);
        else
            response.status(404).end()
    })
    .catch(error=>next(error));
})

app.get('/info',
        (request,response)=>{
            console.log(request.params);

    Person.find({}).then(returnedPersons=>{
        const amount = returnedPersons.length;
        const now = new Date();
        const result = `<p>Phonebook has info for ${amount} people </p> <p><br/>${now}</p>`
    
        response.send(result);
    })
   
})

app.delete('/api/persons/:id',(req,resp,next)=>{
    Person.findByIdAndRemove(req.params.id)
        .then(result=>{
            resp.status(204).end();
        })
        .catch(error=>{
            next(error);
        })
})

const generateId = ()=>{
    return Math.floor(Math.random() * 10000);
}

app.put('/api/persons/:id',(request, response,next)=>{
    const body = request.body;
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person,{new:true})
    .then(updatedPerson=>{
        response.json(updatedPerson);
    })
    .catch(error=>next(error));
})

app.post('/api/persons', (req, res)=>{
    const body = req.body;
    
    if(!body.name || !body.number){

        if(!body.name){
            console.log('body.name not available');
            return res.status(400).json({
                error:'name missing'
            });
        }
        else if(!body.number){
            console.log('body.number not available');
            return res.status(400).json({
                error:'number missing, required number'
            });
        }
    }
    /*
    const found = Person.find({name:body.name}).then(foundPerson=>{
        console.log('found')
        console.log(foundPerson);
    })
    if(found !== undefined){
        return res.status(400).json({
            error:'name must be unique'
        });
    }*/

    const newPerson = new Person({
        name: body.name,
        number: body.number,
        id: generateId()
    });

    newPerson.save().then(person=>{
        res.json(person);
    })

    
})



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  };

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT||3001;
console.log()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})