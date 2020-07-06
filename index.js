const http = require('http');
const express = require('express');
const { response } = require('express');
const cors  = require('cors');
const app = express();
var morgan = require('morgan');

let persons = [
    { name: 'Arto Hellas', number: '040-123456', id:1},
    { name: 'Ada Lovelace', number: '39-44-5323523',id:2 },
    { name: 'Dan Abramov', number: '12-43-234345', id:3},
    { name: 'Mary Poppendieck', number: '39-23-6423122',id:4 }
]

morgan.token('bodydata', (req,res)=>{
    return JSON.stringify(req.body);
})

app.use(cors());
app.use(express.static('build'))
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodydata'));

app.get('/api/persons',
            (request,response)=>{
        response.json(persons);
})

app.get('/api/persons/:id',
            (request,response)=>{
    const id = Number(request.params.id);
    const person = persons.find(person=>person.id === id);
    //console.log(person)
    if(person){
        response.json(person)
    }
    else{
        response.status(404).end();
    }
})

app.get('/info',
        (request,response)=>{
            console.log(request.params);
    const amount = persons.length;
    const now = new Date();
    const result = `<p>Phonebook has info for ${amount} people </p> <p><br/>${now}</p>`

    response.send(result);
})

app.delete('/api/persons/:id',(req,resp)=>{
    const id = Number(request.params.id);
    persons = persons.filter(p=>p.id !==id);
    console.log( persons.filter(p=>p.id !==id));
    response.status(204).end();
})
const generateId = ()=>{
    return Math.floor(Math.random() * 10000);
}

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
    const found = persons.find(person=>person.name === body.name);
    if(found !== undefined){
        return res.status(400).json({
            error:'name must be unique'
        });
    }

    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId()
    };

    persons = persons.concat(newPerson);

    res.json(newPerson);
})



const PORT =3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})