import React from 'react';
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';


export const MyNavbar: React.FC<{
    callback:(pageName: string) => void 
}> = ({callback}) => {

    const handleSelect = (eventKey: any, event: any): void => {
         callback(eventKey);
    }

    return <Navbar bg="light" expand="lg" onSelect={handleSelect}>
            <Nav.Link href="#RecipeCollection">My Cookbook!</Nav.Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#RecipeInputPage">Add Recipes!</Nav.Link>
                    <Nav.Link href="#GetCookin">What's Cookin?</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
}