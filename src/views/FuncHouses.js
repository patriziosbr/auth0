import React, { useState }  from "react";
import { Button, Row, Col } from "reactstrap";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { units } from "../utils/units";



export const FuncHouses = () => {
  const { user } = useAuth0();
  const [items, setArr] = useState([]);
  let removeOne = false;
  const removeMe = (name) =>  setArr(items.filter((el) => {
    if(removeOne)
        return true;
    removeOne = el == name
        return !removeOne;
  } ));

  return (
    <div>
        <h2>{user.name}</h2>
        <Row>
            <Col>
            <div>
                <h5> </h5>
                {items.map((a, index) => (
                    <p key={index}>{a} - {index}</p>
                ))}
            </div>
                <ul>
                    {units.map(({ name }, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                <Button type="button" onClick={() => removeMe(name)} >remove</Button>
                                <Button type="button"  onClick={() => setArr([...items, name])}>add</Button>
                            </div>
                        </li>
                        );
                    })}
                </ul>
            </Col>
        </Row>
    </div>
  );
};

export default withAuthenticationRequired(FuncHouses, {
  onRedirecting: () => <Loading />,
});
