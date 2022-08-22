import React, {Component} from 'react'

const GetUser = (props) =>{
    const {name, age, birthday, avatar, address } = props
    return (
        <div className="userList">
        <p>
          Tên:<b>{name}</b>
        </p>
        <p>
          Tuổi:<b>{age}</b>
        </p>
        <p>
          Năm sinh :<b>{birthday}</b>
        </p>
        <p>
          Avatar : <img src={avatar} alt="images" className="ava" />
        </p>
        <p>
          Quê Quán :<b>{address}</b>
        </p>
        <hr/>
      </div>
    )
}

// class GetUser extends Component {
//     constructor(props){
//         super(props)
        //this.state={ 
            // User: 
       // }

//     }

//     render(){
//         return(
//             <div>
//                 <ul>
//                 {this.state.User.map((data) => (
//                     name={data.name}
//                     age={data.age}
//                     birthday={data.birthday}
//                     avatar={data.avatar}
//                     address={data.address} 
//              ))}
                
//                 </ul>
//             </div>
//         )
//     }

// }

export default GetUser