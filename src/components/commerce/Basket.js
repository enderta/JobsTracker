import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import NaviBar from './NaviBar';


function Basket() {
    const [basket, setBasket] = useState([]);
    const [total, setTotal] = useState(0);
    const [darkMode, setDarkMode] = useState(true);
    const [show, setShow] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const [orderPlaced, setOrderPlaced] = useState(false);

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
    };

    console.log(localStorage.getItem('userId'));

    useEffect(() => {
        const savedBasket = localStorage.getItem('basket');
        if (savedBasket) {
            setBasket(JSON.parse(savedBasket));
        } else {
            setBasket([]);
        }

        fetch(`http://localhost:5000/api/basket/${localStorage.getItem('userId')}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Basket not found') {
                    setBasket([]);
                } else {
                    setBasket(data.data);
                    setTotal(data.total);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [orderPlaced]);

    console.log(
        basket.filter((item) => new Date().toISOString().includes(item.created_at.split('T')[0]))
    );
    let arr= basket


    const handleCheckout = (id) => {
        setBasket((prevBasket) => prevBasket.filter((item) => item.id !== id));
        alert('Order Placed Successfully');
        // Save the updated basket to localStorage
        localStorage.setItem('basket', JSON.stringify(basket));
    };
    console.log(arr)
    return (
        <div>
            <div>
                <NaviBar />
            </div>
            <h1 style={{ color: darkMode ? 'blueviolet' : 'black' }}>Basket</h1>
            <div className={'container'}>
                <div className={'row'}>
                    {basket.length > 0 ? (
                        basket
                            .filter((item) => new Date().toISOString().includes(item.created_at.split('T')[0]))
                            .map((item) => (
                                <div className="col-md-4">
                                    <Card
                                        className="text-center"
                                        style={{
                                            backgroundColor: darkMode ? '#3656a2' : 'white',
                                            color: darkMode ? 'white' : 'black',
                                            margin: '10px',
                                        }}
                                    >
                                        <Card.Body>
                                            <Card.Title style={{ color: darkMode ? 'white' : 'black' }}>{item.name}</Card.Title>
                                            <Card.Text style={{ color: darkMode ? 'white' : 'black' }}>
                                                Description: {item.description}
                                            </Card.Text>
                                            <Card.Text style={{ color: darkMode ? 'white' : 'black' }}>
                                                Price: {item.price}
                                            </Card.Text>
                                            <Card.Text style={{ color: darkMode ? 'white' : 'black' }}>
                                                Quantity: {item.quantity}
                                            </Card.Text>
                                            <Card.Text style={{ color: darkMode ? 'white' : 'black' }}>
                                                Paid: {item.total_amount}
                                            </Card.Text>
                                            <Card.Text style={{ color: darkMode ? 'white' : 'black' }}>
                                                Order Date: {new Date(item.created_at).toLocaleString().split(',')[0]}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="text-muted">
                                            <Button variant={darkMode ? 'outline-light' : 'outline-dark'} onClick={() => setShow(true)}>
                                                Go to Checkout
                                            </Button>
                                            <Modal show={show} onHide={() => setShow(false)}>
                                                <div>
                                                    <div className={'container'}>
                                                        <div className={'row'}>
                                                            <div className="col-md-4">
                                                                <h3>Order Summary</h3>
                                                                <h4>
                                                                    {item.quantity > 1 ? `${item.quantity} items` : `${item.quantity} item`}
                                                                </h4>
                                                                <h5>Amount: {item.total_amount}</h5>
                                                                <h5>Paid: {item.total_amount}</h5>
                                                                <h5>Name: {item.name}</h5>
                                                                <h5>id: {item.id}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <form>
                                                        <div className={'container'}>
                                                            <div className={'row'}>
                                                                <div className="col-md-4">
                                                                    <h3>Shipping</h3>
                                                                    <Form.Group controlId="address">
                                                                        <Form.Label>Address</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Enter address"
                                                                            value={address}
                                                                            onChange={(e) => setAddress(e.target.value)}
                                                                            required
                                                                        />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="city">
                                                                        <Form.Label>City</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Enter city"
                                                                            value={city}
                                                                            onChange={(e) => setCity(e.target.value)}
                                                                            required
                                                                        />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="postalCode">
                                                                        <Form.Label>Postal Code</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Enter postal code"
                                                                            value={postalCode}
                                                                            onChange={(e) => setPostalCode(e.target.value)}
                                                                            required
                                                                        />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="paymentMethod">
                                                                        <Form.Label>Payment Method</Form.Label>
                                                                        <Form.Control
                                                                            as="select"
                                                                            value={paymentMethod}
                                                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                                                            required
                                                                        >
                                                                            <option value="PayPal">PayPal</option>
                                                                            <option value="Stripe">Stripe</option>
                                                                            <option value="Cash">Cash</option>
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                    <Button type="submit" variant="primary" onClick={() => handleCheckout(item.id)}>
                                                                        Place Order
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </Modal>

                                        </Card.Footer>
                                    </Card>
                                </div>
                            ))):  <h1 style={{color: darkMode ? 'blueviolet' : 'black'}}>Basket is empty</h1>
                    }

                </div>
            </div>
        </div>
    )

}

export default Basket