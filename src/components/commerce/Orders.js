import React, {useEffect, useState} from 'react'
import {Button, Card} from "react-bootstrap";

function Orders() {
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
    };

    useEffect(() => {
        async function fetchData() {
           //get method and auth token
              const response = await fetch('http://localhost:5000/api/basket', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
              });
                const data = await response.json();
                setBasket(data.data);


        }

        fetchData();
    }, []);
    console.log(basket)

    useEffect(() => {
        let total = "";
        basket.forEach((item) => {
            total += item.total_amount;
        });
        setTotal(total);
    }, [basket]);
const handleHome = () => {
        window.location = '/home';
}


    return (
        <div>
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
                                {`Your Orders`}
                            </h1>
                            {
                                basket.map((item) => (
                                    <Card
                                        key={item.id}
                                        className={darkMode ? 'bg-dark text-light' : ''}

                                    >
                                        <Card.Header>{item.name}</Card.Header>
                                        <Card.Body>
                                            <Card.Title> {`Quantity: ${item.quantity}`}</Card.Title>
                                            <Card.Text>
                                                {`Price: ${item.price}`}
                                            </Card.Text>
                                            <Card.Text>
                                                {`Total: ${item.total_amount}`}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))

                            }
                        </div>
                    </div>
                </div>
                <Button variant={darkMode ? 'outline-warning' : 'outline-dark'} onClick={handleHome}>
                    {`Home`}
                </Button>
            </div>
        </div>
    )
}

export default Orders
