import React from 'react';
import { Row, Col, Table, Modal } from 'react-bootstrap';
import { Recipe } from '../types';


export const RecipeCollection: React.FC<{
    recipes: Recipe[]}> = ({recipes}) => {

    return <div>
            <h1>Your Awesome Recipes!</h1>
        <Table striped bordered hover>
        <tbody>
            {
                recipes.map((recipe, index) => <tr>
                    <td>{recipe.name}</td>
                </tr>)
            }
        </tbody>
    </Table>
    </div>
}