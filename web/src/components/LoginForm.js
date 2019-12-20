import React, { Component } from "react";
import { InputLogin } 
 from "../styles/StyledForm";
import { BottomButtons } from "../styles/StyledGivngList";
export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onLoginClick() {
        this.props.user.login(this.state.email, this.state.password);
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    render() {
        return (
        <div style={{
            display: 'flex', 
            flexDirection: 'row'
        }}>
          {/* {this.props.user.isLoggedIn && <Redirect to="/dashboard" noThrow />}     */}
              <label htmlFor="email"></label>
              <InputLogin 
              type="text"
              placeholder="Enter Email"
              name="email"
              required
              value={this.state.email}
              onChange={this.handleEmailChange}
              />
  
              <label htmlFor="password"></label>
              <InputLogin
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              value={this.state.password}
              onChange={this.handlePasswordChange}
              />
            
            <BottomButtons style={{marginTop: "-1vh", marginBottom: "1vh"}} primary value="Login" className="loginBtn" onClick={() => this.onLoginClick() }>LOGIN</BottomButtons>
            
        </div>

    )}}
