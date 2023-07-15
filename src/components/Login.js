import React, {useEffect, useState} from 'react'
import {Button, Card, Form, Image} from "react-bootstrap";

function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleChanges = (e) => {
        if (e.target.name === 'username') {
            setUserName(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });
        const data = await response.json();
        if (data.status === 'success') {
            localStorage.setItem('token', data.token);
            window.location = '/jobs';
        } else {
            alert(data.message);
        }
    }

    return (
        <div>
            <div>
                <Image src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg"
                       style={{position:"absolute", opacity: '0.8', height: "100%", width: "100%"}}/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1
                            className="text-center"
                            style={{margin: '10px', color: 'black'}}
                        >
                            Login
                        </h1>
                        <Card
                            className={'bg-dark text-light'}
                            style={{margin: '10px', padding: '10px'}}
                        >
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter user name"
                                        name="username"
                                        value={username}
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <br/>
                                <div className="d-flex justify-content-between">
                                    <Button variant={'outline-warning'} type="submit">
                                        Login
                                    </Button>
                                    <Button
                                        variant={'outline-warning'}
                                        onClick={() => {
                                            window.location = '/register';
                                        }}
                                    >
                                        Not a member? Register!
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
