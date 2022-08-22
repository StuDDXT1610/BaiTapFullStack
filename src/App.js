import React, {Component} from 'react'
import User from "./db.json";
import GetUser from './Components/userLists';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {      
        List: User
    }
  }

  deleteAll = () => {
    this.setState({
      List:  []
  })
  }

  resetAll = () => {
    this.setState({
      List:  User
  })
  }

  render () {
    return(
      <div>
        {this.state.List.map((data) => (
          <GetUser
          name={data.name}
          age={data.age}
          birthday={data.birthday}
          avatar={data.avatar}
          address={data.address}
          
          />
        ))}
        <button onClick={this.deleteAll}>Delete</button>
        <button onClick={this.resetAll}>Reset</button>
      </div>
    )
  }
}

export default App;
