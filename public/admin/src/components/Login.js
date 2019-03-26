import React from 'react';
import '../styles/Login.css';

const Login = (props) => {
    return (
        <div>
            <form onSubmit={props.handleLogin} >
                <label htmlFor="password">Please Enter Password: </label>
                <input type="password" name="password" />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login;