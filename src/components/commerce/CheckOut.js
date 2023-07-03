
import React, {useState} from 'react'
import {Button, Form} from "react-bootstrap";

function CheckOut(props) {
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleCheckOut = (e) => {
        e.preventDefault();
        setOrderPlaced(true);
        alert('Order Placed Successfully');
        window.location.reload();

        fetch(`http://localhost:5000/api/basket/${props.item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Order deleted successfully');
            })
            .catch((error) => {
                console.log('Error deleting order:', error);
            });
    };
    return (
        <div>
            <div className={'container'}>
                <div className={'row'}>
                    <div className="col-md-4">

                        <h3>Order Summary</h3>

                        <h4>
                            {props.item.quantity > 1 ? `${props.item.quantity} items` : `${props.item.quantity} item`}
                        </h4>
                        <h5>
                            Amount: {props.item.total_amount}
                        </h5>
                        <h5>
                            Paid: {props.item.total_amount}
                        </h5>
                        <h5>
                            Name: {props.item.name}

                        </h5>
                        <h5>
                            id: {props.item.id}
                        </h5>
                    </div>
                </div>
            </div>
            <form onSubmit={handleCheckOut}>
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
                            <Button type="submit" variant="primary">
                                Place Order
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default CheckOut