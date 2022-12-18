
import { UserConsumer } from '../utils/user-context';


import React, {useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem} from "reactstrap";




const ShowHouses = () => {

    return(
        <div>
            <UserConsumer>
           
                {({ username }) => <h1>Welcome {username}!</h1>}



            </UserConsumer>
        </div>
        
    )
}
export default ShowHouses;
