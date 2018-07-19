import React, { Component } from 'react';
import { searchUser, getUserProfile } from '../../Utils/ApiUtils';
import classes from './Search.css';
class Search extends Component {
    state = {
        searchString: {
            value: ''
        },
        users: [],
    }

    handleChange = (event) => {
        event.preventDefault();
        const targetName = event.target.name;
        const targetValue = event.target.value;
        this.setState({
            [targetName]: {
                value: targetValue,
            }
        })
        
        searchUser(targetValue)
            .then(response => {
                let details = []
                response.map(user => {
                    getUserProfile(user)
                        .then(userResponse => {
                            details.push(userResponse.userinfo)
                            this.setState({
                                users: [...details]
                            });

                        })
                })
            })
    }

    render() {
        return (
            <div className={classes.searchForm}>
                <form >

                    <input type="text" name="searchString" value={this.state.searchString.value}
                        onChange={this.handleChange} className={classes.searchBox}
                        placeholder="Username ,name....."
                    />

                    <div>
                        {
                            this.state.users.splice(0, 4).map(user => {
                                return (
                                    <div >
                                        <div className={classes.searchResult}>
                                            <p className={classes.overflow_handle} key={user}><a href={"/profile/" + user.userName}>{user.firstName} {user.lastName}({user.userName})</a></p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </form>
            </div>
        )
    }

}
export default Search;