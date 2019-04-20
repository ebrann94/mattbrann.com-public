import React, { useState } from 'react';
import '../styles/Login.css';

const Login = ({ handleLogin }) => {
    const [password, setPassword] = useState('');

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (password) {
                    handleLogin(password);
                }
            }} >
                <label htmlFor="password">Please Enter Password: </label>
                <input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login;