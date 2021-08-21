import React, { useState } from 'react';
import logo from './logo.svg';
// import './App.css';
import { RecipeInputPage } from './pages/recipe-input-page';
import { IngredientInventoryPage} from './pages/ingredient-inventory-page';
import { LoginPage } from './pages/login';
import { RecipeCollection } from './pages/recipe-collection-page';
import { MyNavbar } from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { useRecipeAppModel } from './model';
import { NavbarController } from './controllers/navbar-controller';
// Components are special ts functions that retrun HTML
// Ternary operator (the way you can get a 'if statement' to return a value for use in REACT)
// let myVar = flag === true ? "Hello" : "Bye" (is the same as) let myVar = if (flag) return hello else bye

function App() {

  console.log("I found the hash", window.location.hash);

  
  if (window.location.hash) {
    //return <IngredientInventoryPage/>
    return <div>
              <NavbarController user={window.location.hash.slice(1)}/>
            </div>
  }
    return <Card bg="light" style={{ margin: "2.5em"}}>
              <Card.Body>
              <LoginPage />
                </Card.Body>
            </Card>
  
}
export default App;
