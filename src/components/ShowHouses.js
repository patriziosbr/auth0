import React, {useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Row, Col,CardText,Button} from "reactstrap";



const ShowHouses = () => {
    const { user } = useAuth0();
    const user_id = user.sub;
    const [userHouse, setUserHouse] = useState(null);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        axios.get('http://localhost:8000/houses'
        ).then(res=>{
        //    console.log("res", res.data); 
           let user_house_temp = res.data.filter((house => 
            house.user_id === user_id
           ))
           setUserHouse(user_house_temp)
        //    console.log(user_house_temp);
           return
        });
    }, [user_id]);
    console.log(userHouse);
    return(
    
        <div>
            <h2>Your Houses</h2>
            { 
            userHouse && 
            <div className="d-flex">
                {userHouse.map((house, index) => {
                    return (
                      
                        <Row>
  <Col sm="6">
    <Card body>
      <CardTitle tag="h5">
        Special Title Treatment
      </CardTitle>
      <CardText>
        With supporting text below as a natural lead-in to additional content.
      </CardText>
      <Button>
        Go somewhere
      </Button>
    </Card>
  </Col>
  <Col sm="6">
    <Card body>
      <CardTitle tag="h5">
        Special Title Treatment
      </CardTitle>
      <CardText>
        With supporting text below as a natural lead-in to additional content.
      </CardText>
      <Button>
        Go somewhere
      </Button>
    </Card>
  </Col>
</Row>

                        // <Row>
                        //     <Col>
                        //         <Card
                        //         style={{
                        //             width: '18rem'
                        //         }}
                        //         key={index}
                        //         >
                        //             <CardBody>
                        //                 <CardTitle tag="h5">
                        //                 {house.name}
                        //                 </CardTitle>
                        //             </CardBody>
                        //             <ListGroup flush>
                        //                 <ListGroupItem>
                        //                     {house.units.map((type, index) => {
                        //                         return <h6 key={index}>{type}</h6>
                        //                     })}
                        //                 </ListGroupItem>
                        //             </ListGroup>
                        //         </Card>
                        //     </Col>
                        // </Row>
                    );
                })}
            </div>
            }
        </div>
        
    )
}
export default ShowHouses;
