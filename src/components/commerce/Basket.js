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
     console.log(basket.filter((item) =>  (item.created_at.split("T")[0])));
    return (
        <div>
            <div>
                <NaviBar/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Basket</h1>
                        <div className="row">
                            <div className="col-12">

                                            <Table striped bordered hover variant={darkMode ? 'dark' : 'light'}>
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product Name</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Date</th>
                                                    <th>Total</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {/*filter today`s order*/}
                                                {
                                                    basket.filter((item) =>  new Date().toISOString().includes(item.created_at.split("T")[0])).map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.price}</td>
                                                            <td>
                                                                {new Date(item.created_at).toLocaleString()
                                                                    .split(',')[0]}
                                                            </td>
                                                            <td>{item.total_amount}</td>
                                                        </tr>
                                                    ))

                                                }
                                                </tbody>

                                            </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Basket
