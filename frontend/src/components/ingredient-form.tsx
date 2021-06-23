import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';


export const IngredientForm: React.FC<{
    callback: (payload: {ingredient: string, amount: string}) => void,
    defaultValue: {ingredient: string, amount: string} | undefined
    }> = ({callback, defaultValue}) => {

    const clickCallback = (evt: any) => {
        evt.preventDefault();
        const ingredientInput = evt.target[0];
        const amountInput = evt.target[1];
        const payload = {
            ingredient: ingredientInput.value,
            amount: amountInput.value,
        };
        callback(payload);
    }
    return <Form onSubmit={clickCallback}>
        <Form.Group as={Row} controlId="formIngredient">
            <Form.Label column sm={2} lg={4}>Ingredient</Form.Label>
            <Col sm={10} lg={8}>
                <Form.Control defaultValue={defaultValue?.ingredient}/>
            </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formAmount">
            <Form.Label column sm={2} lg={4}>Amount</Form.Label>
            <Col sm={10} lg={8}>
                <Form.Control defaultValue={defaultValue?.amount}/>
            </Col>
        </Form.Group>
        {/* <Form.Group as={Row}> */}
            <Button type="submit" size="lg">Submit Ingredient</Button>
        {/* </Form.Group> */}
    </Form>
}