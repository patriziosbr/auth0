import React, {useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

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
    },[setUserHouse, user_id]);
    console.log(userHouse);
    return(
        <div>
            <h2>Your Houses</h2>
            { 
                userHouse && 
                    <div>
                        {userHouse.map(({ name }, index) => {
                            return (
                                <h4 className="mr-5">{name}</h4>
                            );
                        })}
                    </div>
            }
                
            

        </div>
    )
}
export default ShowHouses;
