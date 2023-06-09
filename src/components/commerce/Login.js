import React, {useEffect, useState} from 'react'
import {Button, Card, Form} from "react-bootstrap";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true' ? true : false);

    console.log(localStorage.getItem('darkMode'))
    const handleChanges = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {email, password};
        fetch('http://localhost:5000/api/users/login', {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId.toString());
                window.location = '/home';
            })
            .catch(err => console.error(err.message));
    }

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', darkMode);
    }

    useEffect(() => {
        if (darkMode) {
            localStorage.setItem('darkMode', darkMode);
            document.body.style.backgroundColor = "black";
            document.body.style.color = '#3a2f2f';
        } else {
            localStorage.setItem('darkMode', !darkMode);
            document.body.style.backgroundColor = '#e7e7e7';
            document.body.style.color = 'darkgray';
        }
    }, [darkMode]);




    return (
        <div>
            <div style={{margin: '10px'}}>
            <div className="d-flex justify-content-between" style={{margin: '10px'}}>
                <Button variant={darkMode ? 'outline-warning' : 'outline-dark'} onClick={handleDarkMode}>
                    {darkMode ? (
                        <span style={{color: 'goldenrod'}}>&#x2600; </span>
                    ) : (
                        <span style={{color: 'darkgray'}}>&#127769;</span>
                    )}
                </Button>
            </div>

                <div className="container" >
                    <div className="row" >
                        <div className="col-md-6 offset-md-3">
                            <h1 className="text-center"
                                style={{margin: '10px', color: darkMode ? 'goldenrod' : 'darkgray'}}>Login</h1>
                            <Card
                                className={darkMode ? 'bg-dark text-light' : ''}
                                style={{ margin: '10px', padding: '10px' }}
                            >
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label style={{color: darkMode ? 'goldenrod' : 'darkgray'}}>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleChanges} />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label style={{color: darkMode ? 'goldenrod' : 'darkgray'}}>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleChanges} />
                                </Form.Group>
                                <br />
                                <div className="d-flex justify-content-between" >
                                    <Button variant={darkMode ? 'outline-warning' : 'outline-dark'} type="submit">
                                        Login
                                    </Button>
                                    <Button variant={darkMode ? 'outline-warning' : 'outline-dark'} onClick={() => {
                                        window.location = '/register';}
                                    }>
                                        Not a member? Register!
                                    </Button>
                                </div>

                            </Form>
                            </Card>

                        </div>
                    </div>
                </div>

            </div>
        </div>
)
}

export default Login
