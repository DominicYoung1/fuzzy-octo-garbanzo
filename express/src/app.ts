
import express from 'express';
import cors from 'cors';
import {connectDb, addGreeting, readGreetings, dropDuplicates} from './services/mongoDB'

const app: express.Application = express();

app.use(cors());

app.get('/hello', (request, response) => {
  response.send("Hello");
});

app.get('/bye', (request, response) => {
  response.send("goodbye!");
});

app.listen(8888, () => {
  console.log("App is listening on port 8888");
})

connectDb();
addGreeting('Hail and well met');
addGreeting('Sup homie G');
addGreeting('henlo');
const greets = readGreetings();
greets.then(greetings => console.log("MongoDb Says", greetings));
dropDuplicates();