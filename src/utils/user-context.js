import React, { createContext } from 'react';
import axios from 'axios';

const UserContext = createContext({
  username: '',
  updateUsername: () => {},
  arrHouses: [],
  getHouses: () => {},

});


export class UserProvider extends React.Component {
  updateUsername = (newUsername) => {
    this.setState({ username: newUsername });
  };

  getHouses = ()=> {
    axios.get('http://localhost:8000/houses')
    .then( res => {
      this.setState({ arrHouses: res.data });
        return
    });
  }
  state = {
    username: 'user',
    updateUsername: this.updateUsername,
    getHouses: this.getHouses

  };

  render() {
    console.log(this.props.children);
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const UserConsumer = UserContext.Consumer;
