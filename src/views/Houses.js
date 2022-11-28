import React, { Component, useState } from "react";
import axios from "axios";
import { units } from "../utils/units";

import { Row, Col, Button, Form, FormGroup, Label, Input} from "reactstrap";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import contentData from "../utils/contentData";

class Houses extends Component {
    state = {
        loading: false,
        items: [],
        name: ""
    }
    handleAddItem = (pippo) => {
        const items = this.state.items;
        this.setState({ items: [...items, pippo+'item-' + items.length] });
    };



    render() {
        const items = this.state.items;
        return (
        <div className="next-steps my-5">
            <h2 className="my-5">Houses</h2>
            <Row>
                <Col>
                    List: {items.length} total items.
                    {items.map((item, index) => <li key={index}>{item}</li>)}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Row>
                            <Col sm="6">
                                <FormGroup>
                                    <Label for="houseName">House name</Label>
                                    <Input type="text" name="text" id="houseName" placeholder="with a placeholder" />
                                </FormGroup>
                            </Col>
                            <Col sm="6">
                                <FormGroup>
                                    <ul className="toppings-list">
                                        {units.map(({ name }, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="toppings-list-item">
                                                    {/* <input
                                                        type="checkbox"
                                                        id={`custom-checkbox-${index}`}
                                                        name={name}
                                                        value={name}
                                                        onChange= {this.handleChange}
                                                    /> */}
                                                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    <Button>-</Button>
                                                    <Button type="button"  onClick={()=> this.handleAddItem(name )}>+</Button>
                                                </div>
                                            </li>
                                        );
                                        })}
                                    </ul>
                                </FormGroup>
                            </Col>
                        </Row>
                    
                        <Button>Submit</Button>
                    </Form>
                </Col>
            </Row>
            </div>
        );
    }
}
export default withAuthenticationRequired(Houses, {
    onRedirecting: () => <Loading />,
  });