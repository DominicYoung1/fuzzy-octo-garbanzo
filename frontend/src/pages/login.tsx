import React, {useState} from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export const LoginPage: React.FC<{
    callback: (payload: {username: string, password: string}) => void,
    }> = ({callback}) => {

    const clickCallback = (evt: any) => {
        evt.preventDefault();
        const username = evt.target[0];
        const password = evt.target[1];
        const payload = {
            username: username.value,
            password: password.value,
        };
        callback(payload);
    }



    return <Form onSubmit={clickCallback}>
        <Form.Group as={Row} controlId="formUsername">
            <Form.Label column sm={2} lg={4}>Username</Form.Label>
            <Col sm={10} lg={8}>
                <Form.Control />
            </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPassword">
            <Form.Label column sm={2} lg={4}>Password</Form.Label>
            <Col sm={10} lg={8}>
                <Form.Control type="password" />
            </Col>
        </Form.Group>
        {/* <Form.Group as={Row}> */}
            <Button type="submit" size="lg">Submit</Button>
        {/* </Form.Group> */}
    </Form>
}