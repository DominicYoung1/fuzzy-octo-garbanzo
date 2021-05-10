
import express from 'express';

const app: express.Application = express();

app.get('/', (request, response) => {
  response.send("Hello world!");
});


app.listen(8888, () => {
  console.log("App is listening on port 8888");
})