import React, {useEffect, useState} from 'react'
import {Button, Card, Table} from "react-bootstrap";
import NaviBar from "./NaviBar";

function Basket() {
    const [basket, setBasket] = useState([]);
    const [total, setTotal] = useState(0);
    const [darkMode, setDarkMode] = useState(true);

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
    }

    useEffect(() => {
        fetch(`http://localhost:5000/api/basket/${localStorage.getItem("userId")}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')},
        })
            .then((response) => response.json())
            .then((data) => {
                    console.log(data);
                    setBasket(data.data);
                    setTotal(data.total);
                }
            )
            .catch((error) => {
                    console.error('Error:', error);
                }
            );

    }, []);
     console.log(basket.filter((item) =>  new Date().toISOString().includes(item.created_at.split("T")[0])));
    return (
        <div>
            <div>
                <NaviBar/>
            </div>
            <h1 style={{color: darkMode ? 'blueviolet' : 'black'}}>Basket</h1>
            <div className={'container'}>
                <div className={'row'}>
                    {
                        basket.filter((item) =>  new Date().toISOString().includes(item.created_at.split("T")[0])).map((item) => (
                            <div className="col-md-4" >
                                <Card
                                    className="text-center"
                                    style={{
                                        backgroundColor: darkMode ? '#3656a2' : 'white',
                                        color: darkMode ? 'white' : 'black',
                                        margin: '10px'
                                    }}
                                >

                                    <Card.Body>
                                        <Card.Title
                                            style={{color: darkMode ? 'white' : 'black'}}>{item.name}</Card.Title>
                                        <Card.Text style={{color: darkMode ? 'white' : 'black'}}>
                                            Description:{" "} {item.description}
                                        </Card.Text>
                                        <Card.Text style={{color: darkMode ? 'white' : 'black'}}>
                                            Price:{" "}{item.price}
                                        </Card.Text>
                                        <Card.Text style={{color: darkMode ? 'white' : 'black'}}>
                                            Quantity:{" "}{item.quantity}
                                        </Card.Text>
                                        <Card.Text style={{color: darkMode ? 'white' : 'black'}}>
                                            Paid:{" "}{item.total_amount}
                                        </Card.Text>
                                        <Card.Text style={{color: darkMode ? 'white' : 'black'}}>
                                            Order Date:{" "}   {new Date(item.created_at).toLocaleString()
                                            .split(',')[0]}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">
                                        <Button
                                            variant={darkMode ? 'outline-light' : 'outline-dark'}
                                            >
                                            Go to Checkout
                                        </Button>
                                    </Card.Footer>
                                </Card>

                            </div>
                        ))

                    }
                </div>
            </div>
        </div>
    )

}

export default Basket
