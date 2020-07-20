const Person = require('../models/person');
const logger = require('../utils/logger');
const personRouter = require('express').Router();

personRouter.get('/api/persons',
  (request,response) => {
    Person.find({}).then(persons => {
      response.json(persons);
    });
  });

personRouter.get('/api/persons/:id',
  (request,response,next) => {
    Person.findById(request.params.id).then(returnedPersons => {
      if(returnedPersons)
        response.json(returnedPersons);
      else
        response.status(404).end();
    })
      .catch(error => next(error));
  });

personRouter.get('/info',
  (request,response) => {
    //console.log(request.params);
    Person.find({}).then(returnedPersons => {
      const amount = returnedPersons.length;
      const now = new Date();
      const result = `<p>Phonebook has info for ${amount} people </p> <p><br/>${now}</p>`;

      response.send(result);
    });

  });

personRouter.delete('/api/persons/:id',(req,resp,next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      logger.info(result);
      resp.status(204).end();
    })
    .catch(error => {
      next(error);
    });
});

const generateId = () => {
  return Math.floor(Math.random() * 10000);
};

personRouter.put('/api/persons/:id',(request, response,next) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(request.params.id, person,{ new:true })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});

personRouter.post('/api/persons', (req, res,next) => {
  const body = req.body;

  const newPerson = new Person({
    name: body.name,
    number: body.number,
    id: generateId()
  });

  newPerson.save().then(person => {
    res.json(person);
  }).catch(error => {
    next(error);});
});


module.exports = personRouter;