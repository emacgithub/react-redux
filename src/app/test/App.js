import React from "react";
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { getNames, getUserDetails } from "./action";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

class App extends React.Component {
    renderUserDetails() {
        console.log("RENDER USER DETAILS CALLED", this.props.names.isFetching)
        if(this.props.names.isFetching) {
            return (
                <div>
                    <MuiThemeProvider><CircularProgress /></MuiThemeProvider>
                </div>
            )
        }
        return (
            <ul>
                <li>{this.props.names.details.username}</li>
                <li>{this.props.names.details.phone}</li>
                <li>{this.props.names.details.website}</li>
            </ul>
        )
    }
    isUserSelected(id) {
        console.log("this.props.names.details", this.props.names.details)
        return this.props.names.selectedUser == id
    }
    createListItems() {
        if(this.props.names.isNamesFetching) {
            return (
                <MuiThemeProvider><CircularProgress /></MuiThemeProvider>
            )
        }
        console.log("this.props.names:" ,this.props.names)
        if(this.props.names.names) {
            console.log("NAMES:" ,this.props.names.names)
            return this.props.names.names.map((user) => {
                return ( 
                    <li key={user.id} onClick={() => this.props.getUserDetails(user.id) }>
                        {user.id} - {user.name} - {user.email}
                        {this.isUserSelected(user.id) && this.renderUserDetails()}
                    </li>
                )
            });
        }
    }
    render(){
        return (
            <div>
                My App Component
                <Button onClick={() => this.props.getNames()} bsStyle="primary">Retrieve names</Button>
                <ul>
                    {this.createListItems()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        names: state.namesReducer
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getNames: () => {
            dispatch(getNames())
        },
        getUserDetails: (id) => {
            dispatch(getUserDetails(id))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);