import React, { Component } from "react";
import axios from "axios";
import { units } from "../utils/units";

import { Row, Col, Button, Form, FormGroup, Label, Input} from "reactstrap";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import contentData from "../utils/contentData";

class Houses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            units: [],
            name: ""
        }
    }

  render() {
    return (
      <div className="next-steps my-5">
        <h2 className="my-5">Houses</h2>
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
                                                <div className="left-section">
                                                <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-${index}`}
                                                    name={name}
                                                    value={name}
                                                />
                                                <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                </div> 
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