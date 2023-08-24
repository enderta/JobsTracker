import React, {useEffect, useState} from 'react'
import {Button, Card, Form, Image} from "react-bootstrap";

function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [darkMode, setDarkMode] = useState(true);
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('bg-dark', 'text-white');
        } else {
            document.body.classList.remove('bg-dark', 'text-white');
        }
    }, [darkMode]);

    const handleChanges = (e) => {
        if (e.target.name === 'username') {
            setUserName(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://jobsapi-pxm2.onrender.com/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });
        const data = await response.json();
        if (data.status === 'success') {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user_id', data.user.id);
            window.location = '/jobs';
        } else {
            alert(data.message);
        }
    }

    return (
        <div>
            <div>
                <Image
                    src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg"
                    style={{position: "absolute", opacity: '0.5', height: "100%", width: "100%"}}/>
            </div>
            <div className="bg-dark container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">

                        <Card
                            className={'bg-dark text-light'}
                            style={{margin: '10px', padding: '10px', opacity: '0.9'}}
                        >
                            <h1
                                className="text-center"
                                style={{color: 'goldenrod'}}
                            >
                                Login
                            </h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter user name"
                                        name="username"
                                        value={username}
                                        data-testid="username"
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
                                        data-testid="password"
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <br/>
                                <div className="d-flex justify-content-between">
                                    <Button variant={'outline-warning'} data-testid={"login"} type="submit">
                                        Login
                                    </Button>
                                    <Button
                                        variant={'outline-warning'}
                                        onClick={() => {
                                            window.location = '/register';
                                        }}
                                    >
                                        No account? Register!
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
