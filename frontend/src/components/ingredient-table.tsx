import React, { useState } from 'react';
import {Table, Modal } from 'react-bootstrap';
import { IngredientForm } from './ingredient-form';
import {Ingredient} from '../types';


export const IngredientTable: React.FC<{
    callback: (payload: Ingredient, ind: number) => void,
     ingredients: Ingredient[]}> = ({ingredients, callback}) => {

    //we dont know how we are going to get it but we need to be making an array of ingerdients.

    const [editingIngredient, setEditingIngredient] = useState<Ingredient | undefined>(undefined);
    const [editingIndex, setEditingIndex] = useState<number | undefined>(undefined);

    
    return <>
    <Modal show={editingIngredient !== undefined} onHide={() => {
        setEditingIngredient(undefined);
        setEditingIndex(undefined);
        }}>
        <Modal.Header closeButton>
            <Modal.Title>Editing {editingIngredient?.ingredient}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <IngredientForm callback={(editedPayload)  => {
                callback(editedPayload,editingIndex as number);
                setEditingIngredient(undefined);
                setEditingIndex(undefined);
            }}
            defaultValue={editingIngredient}/>
        </Modal.Body>


    </Modal>
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>Ingredient</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            {
                ingredients.map((ing, index) => <tr onClick={() => {
                    setEditingIngredient(ing);
                     setEditingIndex(index);
                     }}>
                    <td>{ing.ingredient}</td>
                    <td>{ing.amount}</td>
                </tr>
                )
            }
        </tbody>
    </Table>
    </>
}


//by next time make SUBMIT button work on Modal Form.
//**LOOK AT RECIPEINPUT, LOOK AT INGREDIENT TABLE FOR NEW PROP*/