import React, { useState }  from "react";
import { Button, Row, Col, Label, Input} from "reactstrap";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { units } from "../utils/units";
import axios from 'axios';


export const FuncHouses = () => {
  const { user } = useAuth0();
  //add and remove units
  const [items, setArr] = useState([]);
  let removeOne = false;
  const removeMe = (name) =>  setArr(items.filter((el) => {
    if(removeOne)
        return true;
    removeOne = el === name
        return !removeOne;
  } ));
  //END add and remove units

  let countUnits = "";

  //define house name
  const [value, setValue] = useState('');
  const handleChange = (e) => setValue(e.target.value);
  //END define house name


  const handleClick = async () => {
    axios.post('http://localhost:8000/houses', 
    {"name":value, "units":items})
            .then( res => {
                console.log('res axios senno è triste', res.data); //the pokemon
            }).catch( err => {
                console.log('axios error Post', err);
                //alert in extremis
    })
  };



  return (
    <div>
        <h2 className="mb-5">Add a New Property</h2>
        <p>{user.sub}</p>
        <Row>
            <Col xs="12" sm="6" className="mb-5">
                <Label for="houseName">House name</Label>
                <Input type="text" 
                    value={value} 
                    onChange={handleChange} />
            </Col>
            
            <Col xs="12" sm="6">
            {/* <div> debug 
                <h5> items</h5>
                {items.map((a, index) => (
                    <p key={index}>{a} - {index}</p>
                ))}
            </div> */}
                <ul>
                    {units.map(({ name }, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                <Button type="button" onClick={() => removeMe(name)} >remove</Button>
                                <span> {countUnits = (items.filter(item => 
                                    item === name)).length} 
                                </span>
                                <Button type="button"  onClick={() => setArr([...items, name])}>add</Button>
                            </div>
                        </li>
                        );
                    })}
                </ul>
            </Col>
            <Col>

    <div>

      <button onClick={handleClick}>Make request</button>

    </div>
  
            </Col>
        </Row>
    </div>
  );
};

export default withAuthenticationRequired(FuncHouses, {
  onRedirecting: () => <Loading />,
});
