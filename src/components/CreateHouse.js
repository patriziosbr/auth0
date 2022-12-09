import React, { useState }  from "react";

import { Button, Row, Col, Label, Input} from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { units } from "../utils/units";
import axios from 'axios';
//all fontawesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const iconList = Object
    .keys(Icons)
    .filter(key => key !== "fas" && key !== "prefix" )
    .map(icon => Icons[icon])

library.add(...iconList)
//END all fontawesome icons


 const CreateHouse = () => {

    const { user } = useAuth0();
    //add and remove units
    let countUnits = "";
    const [userUnit, setArr] = useState([]);
    let removeOne = false;
    const removeMe = (name) =>  setArr(userUnit.filter((el) => {
      if(removeOne)
          return true;
      removeOne = el === name
          return !removeOne;
    } ));
    //END add and remove units
  
    //define house name
    const [houseName, setHouseName] = useState('');
    const handleChange = (e) => setHouseName(e.target.value);
    //END define house name
  
    let [errorUnit, setErrorUnit] = useState(0);
    let [errorText, setErrorText] = useState(0);
    let [errorInvalidChar, setErrorInvalidChar] = useState(0);
    const createHouse = async () => {
      //Check house units selected
      if(userUnit.length < 1) {
          errorUnit = setErrorUnit(1);
          console.log("error select at leat one unit ");
      }else {
          errorUnit = setErrorUnit(0);
      }
      //Check house text length
      if(houseName.length < 3) {
          errorText = setErrorText(1);
          console.log("error text too short");
      } else {
          errorText = setErrorText(0);
          if(/[^0-9a-zA-Z]/.test(houseName)) {
              errorInvalidChar = setErrorInvalidChar(1);
              console.log("error errorInvalidChar");
              // exit if the length is more than 3 but contain an invalid char (onlit alphnumeric accepted) 
              return
          } else {
              errorInvalidChar = setErrorInvalidChar(0);
          }
      }
      // show all the error at the same time and exit
      if(userUnit.length === 0 || houseName.length < 3) 
          return
  
      axios.post('http://localhost:8000/houses',
          {"user_id":user.sub , "name":houseName, "units":userUnit })
          .then( res => {
              setArr([])
              setHouseName('') //clear input after submit
              console.log('bingo', res.data);
          }).catch( err => {
              console.log('axios error Post', err);
          })
    };
  
    
    return(
        <div>
            <h2 className="mb-5">Add a New Property</h2>
        <Row>
            <Col xs="12" sm="6" className="mb-5">
                <Label for="houseName">House name</Label>
                <Input type="text" 
                    value={houseName} 
                    onChange={handleChange} />
                <h6 className={(errorText ? 'text-danger' : "d-none")}>House name at least 3 char</h6>
                { errorInvalidChar ? <h6 className={'text-danger'}>Invalid char</h6> : ''}
            </Col>
            
            <Col xs="12" sm="6">
            {/* <div> debug 
                <h5> userUnit</h5>
                {userUnit.map((a, index) => (
                    <p key={index}>{a} - {index}</p>
                ))}
            </div> */}
                <ul style={{ listStyleType: "none" }}>
                    {units.map(({ name, icon }, index) => {
                    return (
                        <li key={index}>
                            <div className="d-flex justify-content-between align-items-center mb-2" style={{ width:"260px"}}>
                                <label className="mr-5">{icon} {name}</label>
                                <div className="d-flex justify-content-between align-items-center" style={{ width:"100px"}}>
                                    <Button type="button" onClick={() => removeMe(name)} >-</Button>
                                    <span> {countUnits = (userUnit.filter(item => 
                                        item === name)).length} 
                                    </span>
                                    <Button type="button"  onClick={() => setArr([...userUnit, name])}>+</Button>
                                </div>
                            </div>
                        </li>
                        );
                    })}
                </ul>
                <h6 className={(errorUnit ? 'text-danger' : "d-none")}>Select dat least 1 unit</h6>
            </Col>
            <Col xs="12" sm="3">
                <button type="button" className="btn btn-success w-100" onClick={createHouse}>Create House</button>
            </Col>
        </Row>
        </div>
    )
}
export default CreateHouse;