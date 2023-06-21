import React, {useEffect, useState} from 'react'
import {Button, Card} from "react-bootstrap";
import NaviBar from "./NaviBar";

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
                headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')},
            });
            const data = await response.json();
            let info = [];
            let orders = data.data
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].user_id == localStorage.getItem('userId')) {
                    info.push(orders[i])
                }

            }
            setBasket(info);
        }

        fetchData();
    }, []);


    return (
        <div>
            <div>
                <NaviBar/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <h1
                                className="text-center"
                                style={{margin: '10px', color: darkMode ? 'goldenrod' : 'darkgray'}}
                            >
                                {`Your Orders`}

                            </h1>
                            <h3>
                                total:{" "}{
                                basket.reduce((acc, item) => acc + parseFloat(item.total_amount), 0).toFixed(2)
                            }
                            </h3>
                            <div className="row" style={{
                                margin: '10px',
                            }}>
                                {
                                    basket.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((item) => (
                                        <div key={item.id} className="col-md-4 mb-4">
                                            <Card
                                                className={darkMode ? '' : ''}
                                                style={{
                                                    backgroundColor: darkMode ? '#3656a2' : 'white',


                                                }}

                                            >
                                                <Card.Body >
                                                    <Card.Title
                                                        style={{color: darkMode ? 'white' : 'black'}}>{item.name}</Card.Title>
                                                    <Card.Text style={{color: darkMode ? 'white' : 'black'}}>
                                                       Description:{" "} {item.description}
                                                    </Card.Text>
                                                    <Card.Text style={{color: darkMode ? 'white' : 'black'}}>
                                                        Amount Paid:{" "}{item.total_amount}
                                                    </Card.Text>
                                                    <Card.Text style={{color: darkMode ? 'white' : 'black'}}>
                                                        Order Date:{" "}   {new Date(item.created_at).toLocaleString()}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                    ))

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders
