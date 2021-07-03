import React, { useState } from 'react';
import { Row, Col, Table, Modal, Button } from 'react-bootstrap';
import { Recipe, Action } from '../types';


export const RecipeCollection: React.FC<{
    recipes: Recipe[]
    dispatch: React.Dispatch<Action>
}> = ({recipes, dispatch}) => {

        const [open, setOpen] = useState(false)
        const [index, setIndex] = useState(-1)



    return <div>
        <Modal show={open} onHide={() => {
            setOpen(false)
        }}>
            <Modal.Header>
                <Modal.Title> {recipes[index]?.name}
                <Button>Edit</Button>
                <Button onClick={() => {
                    dispatch({
                        kind: 'DELETED RECIPE',
                        payload: index,
                    });
                    setOpen(false);
                }}>Delete</Button>
                <Button onClick= {() => {
                    setOpen(false);
                }}>Close</Button>
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ingredient</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recipes[index]?.ingredients.map((ing) => <tr>
                                <td>{ing.ingredient}</td>
                                <td>{ing.amount}</td>
                            </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
            <h1>Your Awesome Recipes!</h1>
        <Table striped bordered hover>
        <tbody>
            {
                recipes.map((recipe, index) => <tr onClick={() => {
                    setIndex(index);
                    setOpen(true);
                }}>
                    <td>{recipe.name}</td>
                </tr>)
            }
        </tbody>
    </Table>
    </div>
}