import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [userName, setUserName] = useState('');

    const handleChanges = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        } else if (e.target.name === 'passwordConfirmation') {
            setPasswordConfirmation(e.target.value);
        } else if (e.target.name === 'firstName') {
            setUserName(e.target.value);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === passwordConfirmation) {
            const body = { email, password, userName };
            fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    window.location = '/login';
                })
                .catch((err) => console.error(err.message));
        } else {
            alert('Passwords do not match');
        }
    };

    return (
        <div>
            <div style={{ margin: '10px' }}>
                <div className="d-flex justify-content-between" style={{ margin: '10px' }}>
                    <Button variant={'outline-dark'}>
                         <span style={{ color: 'goldenrod' }}>&#x2600; </span>
                    </Button>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1
                            className="text-center"
                            style={{ margin: '10px', color: 'goldenrod'  }}
                        >
                            Register
                        </h1>
                        <Card
                            className={'bg-dark text-light'}
                            style={{ margin: '10px', padding: '10px' }}
                        >
                            <Form onSubmit={handleSubmit}>
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
                                        name="userName"
                                        value={userName}
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
                                <Button variant={'outline-warning'} type="submit">
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
