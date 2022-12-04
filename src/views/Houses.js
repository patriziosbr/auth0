import React, { Component } from "react";
// import axios from "axios";
import { units } from "../utils/units";

import { Row, Col, Button, Form, FormGroup, Label, Input} from "reactstrap";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import { withAuth0 } from '@auth0/auth0-react';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import contentData from "../utils/contentData";

class Houses extends Component {
    constructor(props) {
    super(props);
    this.state = {
        loading: false,
        items: [],
        name: ""

        }
    }
    handleAddItem = (unit) => {
        const items = this.state.items;
        this.setState({ items: [...items, unit] });
    };
    handleChange = (e) => {
        this.setState({ name: e.target.value });
    };
    // creatHouse() {
    //     // console.log(this.state.pokeData); //the pokemon
    //     let units = this.state.items;
    //     let name = this.state.name;
    //     axios.post('http://localhost:8000/house/', units, name)
    //     .then( res => {
    //         console.log('res axios senno è triste', res.data); //the pokemon
    //     }).catch( err => {
    //         console.log('axios error Post', err);
    //         //alert in extremis
    //     })
    // }

    render() {
        const items = this.state.items;
        const { user } = withAuth0();
        console.log(user);
        return (
            
        <div className="next-steps my-5">
            <h2 className="my-5">Houses userid: </h2>
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
                                    <Input type="text" value={this.name} onChange={this.handleChange} name="text" id="houseName"  />
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