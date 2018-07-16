import React, { Component } from 'react';
import { searchUser } from '../../Utils/ApiUtils';
import classes from './Search.css';
class Search extends Component {
    state = {
        searchString: {
            value: ''
        },
        users: [],
    }

    handleChange = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;
        this.setState({
            [targetName]: {
                value: targetValue,
            }
        })
        searchUser(targetValue)
            .then(response => {
                this.setState({
                    users: response,
                })
            })
    }

    render() {
        return (
            <div className={classes.searchForm}>
                <form >

                    <input type="text" name="searchString" value={this.state.searchString.value}
                        onChange={this.handleChange} className={classes.searchBox}
                        placeholder="Username, Name, Email.."
                    />

                    <div>
                        {
                            this.state.users.map(user => {
                                return (
                                    <p key={user}><a href={"/profile/" + user}>{user}</a></p>
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