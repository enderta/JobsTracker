import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [name, setFirstName] = useState('');
    const [darkMode, setDarkMode] = useState(true);

    const handleChanges = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        } else if (e.target.name === 'passwordConfirmation') {
            setPasswordConfirmation(e.target.value);
        } else if (e.target.name === 'firstName') {
            setFirstName(e.target.value);
        }
    };

    useEffect(() => {
        if (darkMode) {
            localStorage.setItem('darkMode', darkMode);
            document.body.style.backgroundColor = 'black';
            document.body.style.color = '#3a2f2f';
        } else {
            localStorage.setItem('darkMode', !darkMode);
            document.body.style.backgroundColor = '#e7e7e7';
            document.body.style.color = 'darkgray';
        }
    }, [darkMode]);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', darkMode);
    };

    console.log(localStorage.getItem('darkMode'));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === passwordConfirmation) {
            const body = { email, password, name };
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
                    <Button variant={darkMode ? 'outline-warning' : 'outline-dark'} onClick={handleDarkMode}>
                        {darkMode ? <span style={{ color: 'goldenrod' }}>&#x2600; </span> : <span style={{ color: 'darkgray' }}>&#127769;</span>}
                    </Button>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1
                            className="text-center"
                            style={{ margin: '10px', color: darkMode ? 'goldenrod' : 'darkgray' }}
                        >
                            Register
                        </h1>
                        <Card
                            className={darkMode ? 'bg-dark text-light' : ''}
                            style={{ margin: '10px', padding: '10px' }}
                        >
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label style={{ color: darkMode ? 'goldenrod' : 'darkgray' }}>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={email}
                                        onChange={handleChanges}
                                    />
                                    <Form.Text className="text-muted" style={{ color: darkMode ? 'goldenrod' : 'darkgray' }}>
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicFirstName">
                                    <Form.Label style={{ color: darkMode ? 'goldenrod' : 'darkgray' }}>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter First Name"
                                        name="firstName"
                                        value={name}
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label style={{ color: darkMode ? 'goldenrod' : 'darkgray' }}>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPasswordConfirmation">
                                    <Form.Label style={{ color: darkMode ? 'goldenrod' : 'darkgray' }}>Password Confirmation</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password Confirmation"
                                        name="passwordConfirmation"
                                        value={passwordConfirmation}
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <br />
                                <div className="d-flex justify-content-between">
                                    <Button variant={darkMode ? 'outline-warning' : 'outline-dark'} type="submit">
                                        Register
                                    </Button>
                                    <Button
                                        variant={darkMode ? 'outline-warning' : 'outline-dark'}
                                        onClick={() => {
                                            window.location = '/login';
                                        }}
                                    >
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
