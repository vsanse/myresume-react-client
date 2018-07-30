import React, { Component } from 'react';
import { searchUser, getUserProfile } from '../../Utils/ApiUtils';
import classes from './Search.css';
import commonClasses from '../../common/common.css';
import { Redirect, Link } from 'react-router-dom';
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
                response.forEach(user => {
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
    setRedirect(username){
        return <Redirect to={'/profile/'+username} />
    }

    render() {
        return (
            <div className={classes.searchForm}>


                <input type="text" name="searchString" value={this.state.searchString.value}
                    onChange={this.handleChange} className={classes.searchBox}
                    placeholder="Username/Name/Email" autoComplete="off"
                />
                <p><i>Psst! Search is more accurate with username or email </i></p>

                <div>
                    {
                        this.state.users.map(user => {
                            return (
                                <div key={user.userName} className={classes.searchResult} >
                                    <div className={classes.searchResultInfoDiv}>
                                        <div className={classes.showInfo}>
                                            <p className={classes.overflow_handle}>
                                                {user.firstName} {user.lastName}
                                            </p>
                                                <p className={classes.searchResultEmail}><a href={"mailto:" + user.email}><i className="fas fa-envelope fa-1x"></i>{user.email}</a>
                                                </p>
                                                <p className={classes.searchResultPhone}><a href={"tel:" + user.phoneNumber}><i className="fas fa-mobile-alt fa-1x"></i> {user.phoneNumber}</a></p>

                                        </div>
                                        <div className={classes.viewProfile}>
                                            <button className={commonClasses.btn + " " + classes.viewProfileBtn} ><Link to={"/profile/"+user.userName}>Profile</Link></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }

}
export default Search;