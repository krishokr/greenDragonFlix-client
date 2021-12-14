import React, { useState } from "react";

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        //updates the user state of MainView and make movies list appear
        props.onLoggedIn(username);
    }

    return(
        <form>
            <label>
                Username: 
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} ></input>
            </label>

            <label>
                Password:
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} ></input>
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    )
}