import React, { useState } from 'react';
import { Form, Col, Row, Button, Toast } from 'react-bootstrap';
import { IngredientForm } from '../components/ingredient-form';
import { IngredientTable } from '../components/ingredient-table';
import { Ingredient, Recipe, ModelState, Action } from '../types';

export const RecipeInputPage: React.FC<{
  model: ModelState,
  dispatch: React.Dispatch<Action>
}> = ({model, dispatch}) => {
  
  // const handleSubmit = (evt: any) =>{
  //   evt.preventDefault();
    
  // }
     const [ingredients, setIngredients] = useState<{ingredient: string, amount: string}[]>([]);
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
        setToastOpen(true);
        dispatch({
          kind: 'ADDED_RECIPE',
          payload: recipe,
        });
      }
      
      return (
        <div className="App">
          <h1>Create your delicious recipe!</h1>
          <IngredientForm callback={addToIngredients} defaultValue={undefined}/>
          <Form onSubmit={clickCallback}>
            <Form.Group as={Row} controlID="formRecipe">
              <Form.Label column sm={2} lg={4}>Recipe Name</Form.Label>
              <Col sm={10} lg={8}>
                <Form.Control defaultValue="Recipe Name"/>
              </Col>
            </Form.Group>
            <IngredientTable ingredients={ingredients} callback={modifyIngredient}/>
            <Button type="submit" size="lg">Add Recipe</Button>
          </Form>
          <Toast animation={false} onClick={() => {
            setToastOpen(false)
            console.log('i ran')}} show={toastOpen} delay={3000} autohide={true}>
            <Toast.Body>
              Looks Delicious, added the recipe to your cookbook!
            </Toast.Body>
          </Toast>
        </div>
      );
}