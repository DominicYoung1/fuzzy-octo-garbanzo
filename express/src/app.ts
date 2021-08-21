
import express, { response } from 'express';
import cors from 'cors';
import {connectDb, addGreeting, readGreetings, dropDuplicates} from './services/mongoDB';
import { loginUser, createUser, addRecipe, getRecipes } from './services/recipeDB';
import { RecipePayload } from './types';

const app: express.Application = express();

app.use(cors()).use(express.urlencoded({extended: true}));
app.use(express.json())
app.use('/public', express.static('public'));

app.post('/login', (request, response) => {
  // Login steps:
  // Pull out the enclosed Username and Password in the request obj
  // Check if that username is in our "User pool"
  //  Check that the password they provided matches the password in our database.
  // If their login was successful, we redirect them to the frontend with their access token attached
  //    Else, we reject their login, and they can try again.
  const username = request.body.username;
  const password = request.body.password;
  console.log("this is the body of my request", request.body);
  console.log("Trying to sign in", username, password);
  loginUser(username, password).then(token => {
    if (token !== "INVALID") {
      console.log("Redirecting with token", token);
      response.redirect('/public#' + token);
    } else {
      console.log("Failed login, trying again");
      response.redirect('/public');
    }
  })
})

app.post('/create-account', (request, response) => {
  // Create Account steps:
  // Pull out the enclosed Username and Password in the request obj
  // Check if that username is in our "User pool"
  //  If the user exists in the pool, return an error message that indicates as such.
  // If the user does not exist in the pool, create a new user with the enclosed entries, and return a message indicating success.
  const username = request.body.username;
  const password = request.body.password;
  console.log("this is the body of my request", request.body);
  console.log("Trying to create account", username, password);
  createUser(username, password).then(token => {
    if (token !== "INVALID") {
      console.log("Redirecting with token", token);
      response.redirect('/public#' + token);
    } else {
      console.log("User already exists!");
      response.redirect('/public');
    }
  })
})

app.post('/recipe', (request, response) => {
  // Verify that the backend recieves the payload
  // Check to see if the name of the recipe is unique, and the user exists.
  // add the recipe to the (list??)
  // return a json obj that can allow us to indicate success or faliure
  const recipePayload = request.body as RecipePayload;
  console.log("this is the body of my request", request.body);
  console.log("Trying to add recipe", recipePayload);
  addRecipe(recipePayload).then(ret => {
    if (ret === null) {
      console.log('recipe name already exists!');
      response.json({message: 'recipe name already existed'})
    } else {
      console.log('added your recipe!!');
      response.json({message: 'Success'});
    }
  })
})

app.get('/recipes', (request, response) => {
  // grab the user id
  // filter the recipe pool using the user id
  // alphabetize the new array
  // return the new array
  const userId = request.query.user as string;
  getRecipes(userId).then((records) => {
    records.sort((a, b) => a.name.localeCompare(b.name));
    const mappedRecords = records.map((record) => {
      return {
        name: record.name,
        ingredients: record.ingredients
      };
    });
    response.json({data:mappedRecords});
  })

})
app.listen(8888, () => {
  console.log("App is listening on port 8888");
})

//connectDb();
// addGreeting('Hail and well met');
// addGreeting('Sup homie G');
// addGreeting('henlo');
// const greets = readGreetings();
// greets.then(greetings => console.log("MongoDb Says", greetings));
// dropDuplicates();