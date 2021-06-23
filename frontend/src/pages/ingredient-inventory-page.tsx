import React, { useState } from 'react';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';



export const IngredientInventoryPage: React.FC<{}> = () => {

    const clickCallBack = (evt: any) => {
        evt.preventDefault();
        const ingredientName = evt.target[0];
        addToInventory(ingredientName.value);
    }

    const [inventory, setInventory] = useState<string[]>([])

    const addToInventory = (elem: string) => {
        const updatedInventory = [...inventory, elem];
        setInventory(updatedInventory);
    }

    return (
        <div className="App">
            <Form onSubmit={clickCallBack}>
                <Form.Group as={Row} controlId="formInventory">
                    <Form.Label column sm={2} lg={4}>Ingredient</Form.Label>
                    <Col sm={10} lg={8}>
                        <Form.Control placeholder="Ingredient"/>
                    </Col>
                </Form.Group>
                <Button type="submit" size="lg">Submit</Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ingredient</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        inventory.map(ing => <tr>
                            <td>{ing}</td>
                        </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )

}