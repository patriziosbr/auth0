import React from "react";
import CreateHouse from "../components/CreateHouse";
import ShowHouses from "../components/ShowHouses"
import Loading from "../components/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export const FuncHouses = () => {
  return (
    <div>
        <ShowHouses/>
        <CreateHouse/>
    </div>
  );
};

export default withAuthenticationRequired(FuncHouses, {
  onRedirecting: () => <Loading />,
});
