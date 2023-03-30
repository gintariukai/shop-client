import React from 'react';
import logo from './logo.svg';
import './App.css';
import {createBrowserHistory} from 'history';
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";

import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/shop/ShopPage';
import { LoginPage } from './components/login/LoginPage';
import { RegisterPage } from './components/register/RegisterPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { DetailPage } from './components/detail/DetailPage';
import { AdminPage } from './components/admin/AdminPage';
import { NotFound } from './components/errors/NotFound';
import { Unauthorized } from './components/errors/Unauthorized';

import AuthGuard from './guards/AuthGuard';
import { Role } from './models/role';

import UserService from './services/user.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faUserPlus,
    faSignInAlt,
    faHome,
    faAddressBook,
    faSignOutAlt,
    faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import ContactPage from "./components/contact/ContactPage";

class App extends React.Component {
    state = {
        history: createBrowserHistory(),
        currentUser: null,
        isAdmin: false,
        errorMessage: null,
        currentLocation: '',
    };

    componentDidMount() {
        this.unlisten = this.state.history.listen((location, action) => {
            this.setState({ currentLocation: location.pathname });
        });

        UserService.currentUser.subscribe((data) => {
            this.setState({
                currentUser: data,
                isAdmin: data && data.role === Role.ADMIN,
            });
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    logout() {
        UserService.logOut().then(
            (data) => {
                this.state.history.push('/home');
            },
            (error) => {
                this.setState({
                    errorMessage: "Unexpected error occurred"
                    });
                }
            );
    }

    render(){
        const {currentUser, isAdmin, history, currentLocation} = this.state;
        return (
            <BrowserRouter history={history}>
                <div>
                    {this.state.currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <a className="navbar-brand" href="https://www.facebook.com/NomedaHairBoutique">
                                <img src={logo} className="App-logo" alt="logo"/>
                                Nomeda Hair Boutique
                            </a>
                            <div className="navbar-nav mr-auto">
                                <Link to="/shop" className={currentLocation === '/shop' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faHome}/> Shop</Link>
                                {this.state.isAdmin && <Link to="/admin" className={currentLocation === '/admin' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faUserShield}/> Admin</Link>}
                            </div>

                            <div className="navbar-nav ml-auto">
                                <Link to="/profile" className={currentLocation === '/profile' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faUser}/> {currentUser.name}</Link>
                                <a onClick={()=>this.logout()} className="nav-item nav-link"><FontAwesomeIcon icon={faSignOutAlt}/> LogOut</a>
                            </div>
                        </nav>
                    }

                    {!this.state.currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <a className="navbar-brand" href="https://www.facebook.com/NomedaHairBoutique">
                                <img src={logo} className="App-logo" alt="logo"/>
                                Nomeda Hair Boutique
                            </a>
                            <div className="navbar-nav mr-auto">
                                <Link to="/home" className={currentLocation === '/home' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faHome}/> Home</Link>
                            </div>

                            <div className="navbar-nav ml-auto">
                                <Link to="/register" className={currentLocation === '/register' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faUserPlus}/> Sign Up</Link>
                                <Link to="/shop" className={currentLocation === '/shop' ? 'nav-item nav-link active': 'nav-item nav-link'}> Shop</Link>
                                <Link to="/login" className={currentLocation === '/login' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                                <Link to="/contact" className={currentLocation === '/contact' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faAddressBook}/> Contact</Link>
                            </div>
                        </nav>
                    }
                    <div className="container">
                        <Routes>
                            <Route exact path="/" element={<HomePage />} />
                            <Route exact path="/home" element={<HomePage />} />
                            <Route exact path="/shop" element={<ShopPage />} />
                            <Route exact path="/login" element={<LoginPage />} />
                            <Route exact path="/register" element={<RegisterPage />} />
                            <Route exact path="/contact" element={<ContactPage />} />
                            <Route
                                exact
                                path="/profile"
                                element={<AuthGuard roles={[Role.ADMIN, Role.USER]} component={<ProfilePage />} />}
                            />
                            <Route exact path="/detail/:id" element={<DetailPage />} />
                            <Route
                                exact
                                path="/admin"
                                element={<AuthGuard roles={[Role.ADMIN]} component={<AdminPage />} />}
                            />
                            <Route exact path="/404" element={<NotFound />} />
                            <Route exact path="/401" element={<Unauthorized />} />
                            <Route path="*" element={<Navigate to="/404" />} />
                        </Routes>
                    </div>


                </div>
            </BrowserRouter>
        );
    }
}

export default App;