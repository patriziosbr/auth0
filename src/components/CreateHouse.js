import React, { useState }  from "react";

import { Button, Row, Col, Label, Input, Alert} from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { units } from "../utils/units";
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'; //all fontawesome icons
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from "../components/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Houses from "../views/FuncHouses";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

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

    //House name posted 
    const [houseNamePosted, setHouseNamePosted] = useState('');
    //END House name posted
  
    // close success msg
    const closeMsg = () => setSuccessMsg(0);
    //END  close success msg
  
    let [errorUnit, setErrorUnit] = useState(0);
    let [errorText, setErrorText] = useState(0);
    let [successMsg, setSuccessMsg] = useState(0);
    const createHouse = async (e) => {
    e.preventDefault();
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
      }
      // show all the error at the same time and exit
      if(userUnit.length === 0 || houseName.length < 3) 
          return

      successMsg = setSuccessMsg(0)
      axios.post('http://localhost:8000/houses',
          {"user_id":user.sub , "name":houseName, "units":userUnit })
          .then( res => {
              successMsg = setSuccessMsg(1)
              setArr([])
              setHouseName('') //clear input after submit
              setTimeout(() => {
                {closeMsg()}
              }, 5000);
              houseNamePosted = setHouseNamePosted(res.data.name)
              console.log('bingo', res.data);
          }).catch( err => {
              console.log('axios error Post', err);
          })
    };


    
    return(
        <div>
            <h2 className="mb-5">Add a New Property</h2>
            { successMsg ?
                <Alert color="success" className='d-flex align-items-center justify-content-between'>
                    <p>House succesfully created
                        <Link to="/houses"> Go to houses</Link>
                    </p>
                    <Button className="btn btn-success" onClick={closeMsg}>Close</Button>
                </Alert>
                :
                ''
            }
            
        <form>
        <Row>
            <Col xs="12" sm="6" className="mb-5">
                <Label for="houseName">House name</Label>
                <Input type="text" 
                    value={houseName} 
                    onChange={handleChange} />
                <h6 className={(errorText ? 'text-danger' : "d-none")}>House name at least 3 char</h6>
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
                <button type="submit" className="btn btn-success w-100" onClick={createHouse}>Create House</button>
            </Col>
        </Row>
        </form>

        </div>
        )
}

export default withAuthenticationRequired(CreateHouse, {
    onRedirecting: () => <Loading />,
  });