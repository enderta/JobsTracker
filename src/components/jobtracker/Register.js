import React, { useState } from 'react';
import {Button, Card, Form, Image} from 'react-bootstrap';


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');

    const handleChanges = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        } else if (e.target.name === 'username') {
            setUserName(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email }),
        });
        const data = await response.json();
        if (data.status === 'success') {
            window.location = '/login';
        } else {
            alert(data.message);
        }
    };

    return (
        <div>
            <div>
                <Image src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg"
                       style={{position:"absolute", opacity: '0.8', height: "100%", width: "100%"}}/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">

                        <Card
                            className={'bg-dark text-light'}
                            style={{ margin: '10px', padding: '10px' }}
                        >
                            <h1
                                className="text-center"
                                style={{ color: 'goldenrod'  }}
                            >
                                Register
                            </h1>
                            <Form onSubmit={handleSubmit} >
                               <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={email}
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter User Name"
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
                            </Form>
                            <br/>
                            <div className="d-flex justify-content-between">
                                <Button variant={'outline-warning'} type="submit" onClick={handleSubmit}>
                                    Register
                                </Button>
                                <Button
                                    variant={ 'outline-warning'}
                                    onClick={() => {
                                        window.location = '/login';
                                    }}
                                >
                                    Already have an account? Login!
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
