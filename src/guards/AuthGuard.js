import React from 'react';
import {Route, Redirect, Link} from 'react-router-dom';
import UserService from '../services/user.service';

class AuthGuard extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        const {component: Component, roles} = this.props;
        const currentUser = UserService.currentUserValue;
        if(!currentUser){
            return (<Link to={{pathname: '/login'}}/>);
        }

        if(roles && roles.indexOf(currentUser.role) === -1){
            return (<Link to={{pathname: '/401'}}/>);
        }

        return (<Component/>);
    }

}

export default AuthGuard;
