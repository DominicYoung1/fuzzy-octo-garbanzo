import React, {useState} from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export const LoginPage: React.FC<{
    }> = () => {

    return <Form action="/login" method="post">
        <Form.Group as={Row} controlId="formUsername">
            <Form.Label column sm={2} lg={4}>Username</Form.Label>
            <Col sm={10} lg={8}>
                <Form.Control name="username" />
            </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPassword">
            <Form.Label column sm={2} lg={4}>Password</Form.Label>
            <Col sm={10} lg={8}>
                <Form.Control name="password" type="password" />
            </Col>
        </Form.Group>
        {/* <Form.Group as={Row}> */}
            <Button type="submit" size="lg">Submit</Button>
            <Button type="submit" size="lg" formAction="/create-account">Create Account</Button>
        {/* </Form.Group> */}
    </Form>
}