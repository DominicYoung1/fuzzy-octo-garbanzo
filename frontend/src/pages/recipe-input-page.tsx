import React, { useState } from 'react';
import { Form, Col, Row, Button, Toast } from 'react-bootstrap';
import { IngredientForm } from '../components/ingredient-form';
import { IngredientTable } from '../components/ingredient-table';
import { Ingredient, Recipe, ModelState, Action } from '../types';
import {getRecipes} from '../utility'

export const RecipeInputPage: React.FC<{
  model: ModelState,
  dispatch: React.Dispatch<Action>
}> = ({model, dispatch}) => {
  
  // const handleSubmit = (evt: any) =>{
  //   evt.preventDefault();
    
  // }
     const [ingredients, setIngredients] = useState<{ingredient: string, amount: string}[]>(
       model.editingIndex === -1 ? [] : model.recipes[model.editingIndex].ingredients);
     const [toastOpen, setToastOpen] = useState(false);

    const modifyIngredient = (payload: {ingredient: string, amount: string}, ind: number) => {
      const modifiedIngredient = [...ingredients];
      modifiedIngredient[ind] = payload
      setIngredients(modifiedIngredient);
    }

    const addToIngredients = (payload: {ingredient: string, amount: string}) => {
        //ingredients.push(payload);
        const newIngredients = [payload, ...ingredients];
        setIngredients(newIngredients);
      }

      const clickCallback = (evt:any) => {
        evt.preventDefault();
        const recipeName = evt.target[0].value;
        const recipe = {
          name: recipeName,
          ingredients: ingredients,
        };

        const recipePayload = {
          recipe: recipe,
          user: model.userProfile
        };

        fetch("http://localhost:8888/recipe", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipePayload)
        }).then(async response => {
          if (response.status === 200) {
          const body = await response.json();
          if (body.message === 'Success') {
            console.log("Recipe save was a success!")
          } else {
            console.log('Recipe save failed. Messge:', body.message);
          }
          } else {
            console.error('Could not save recipe', response.status, response.statusText);          }
        }).then(async (res) => {
        await getRecipes(model.userProfile, dispatch)}
        )
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 2000)
      }
      
      const editingCallback = (evt:any) => {
        evt.preventDefault();
        const recipeName = evt.target[0].value;
        const recipe = {
          name: recipeName,
          ingredients: ingredients,
        };
        const recipePayload = {
          recipe: recipe,
          user: model.userProfile
        };

        fetch("http://localhost:8888/edit-recipe", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipePayload)
        }).then(async response => {
          if (response.status === 200) {
          const body = await response.json();
          if (body.message === 'Success') {
            console.log("Recipe edit was a success!")
          } else {
            console.log('Recipe edit failed. Messge:', body.message);
          }
          } else {
            console.error('Could not edit recipe', response.status, response.statusText);          }
        }).then(async (res) => {
        await getRecipes(model.userProfile, dispatch)}
        )
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 2000)
      }




      return (
        <div className="App">
          <h1>Create your delicious recipe!</h1>
          <IngredientForm callback={addToIngredients} defaultValue={undefined}/>
          <IngredientTable ingredients={ingredients} callback={modifyIngredient}/>
          <Form onSubmit={model.editingIndex === -1 ? clickCallback : editingCallback}>
            <Form.Group as={Row} controlID="formRecipe">
              <Form.Label column sm={2} lg={4}>Recipe Name</Form.Label>
              <Col sm={10} lg={8}>
                <Form.Control defaultValue={model.editingIndex === -1 ? "Recipe Name" : model.recipes[model.editingIndex].name}/>
              </Col>
            </Form.Group>
            <Button type="submit" size="lg">{model.editingIndex === -1 ? "Add Recipe" : "Submit Edits"}</Button>
          </Form>
          <Toast animation={false} onClick={() => {setToastOpen(false)}}show={toastOpen}>
            <Toast.Body>
              Looks Delicious, added the recipe to your cookbook!
            </Toast.Body>
          </Toast>
        </div>
      );
}