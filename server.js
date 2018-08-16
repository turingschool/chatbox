const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Chat Box';

app.locals.messages = [
  { id: 'a1', message: 'Hello World' },
  { id: 'b2', message: 'Goodbye World' }
];

app.get('/', (request, response) => {
  response.send('Oh hey Chat Box');
});

app.get('/api/v1/messages', (request, response) => {
  const messages = app.locals.messages;

  response.json({ messages });
});

app.get('/api/v1/messages/:id', (request, response) => {
  const { id } = request.params;
  const message = app.locals.messages.find(message => message.id === id);
  if (message) {
    return response.status(200).json(message);
  } else {
    return response.sendStatus(404);
  }
});

app.post('/api/v1/messages', (request, response) => {
  const { message } = request.body;
  const id = Date.now();

  if (!message) {
    return response.status(422).send({
      error: 'No message property provided'
    });
  } else {
    app.locals.messages.push({ id, message });
    return response.status(201).json({ id, message });
  }
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
