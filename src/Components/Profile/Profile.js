import React, { Component } from 'react';

class Profile extends Component{


    render(){
        console.log("HI")
        return(
            <div>
            {this.props.match.params.username}
            <h2> Hiiiiiiii</h2>
            </div>
        )
    }
}
export default Profile;