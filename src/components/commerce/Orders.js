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
            if(response.status===200){
                let info = [];
                let orders = data.data
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i].user_id == localStorage.getItem('userId')) {
                        info.push(orders[i])
                    }

                }
                setBasket(info);
            }
            else{
                setBasket([])
            }
        }


        fetchData();
    }, []);
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/basket/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')},
        })
            .then((response) => response.json())
            .then((data) => {
                    alert("Order deleted");
                    window.location.reload();
                }
            )
            .catch((error) => {
                    console.error('Error:', error);
                }
            );
    }

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
                            <h3 style={{
                                color: darkMode ? '#3656a2' : 'white',
                                margin: '10px'
                            }}>
                                total:{" "}{
                                basket.reduce((acc, item) => acc + parseFloat(item.total_amount), 0).toFixed(2)
                            }
                            </h3>
                            <div className="row">
                                {
                                   basket.length>0? (
                                       basket.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((item, index) => (
                                           <div className="col-md-4" key={index}>
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
                                                           Paid:{" "}{item.total_amount}
                                                       </Card.Text>
                                                       <Card.Text style={{color: darkMode ? 'white' : 'black'}}>
                                                           Order Date:{" "}   {new Date(item.created_at).toLocaleString()
                                                           .split(',')[0]}
                                                       </Card.Text>
                                                   </Card.Body>
                                                   <Card.Footer className="text-muted">
                                                       <Button
                                                           variant="outline-danger"
                                                           onClick={() => handleDelete(item.id)}
                                                           style={{color: darkMode ? 'white' : 'black'}}
                                                       >
                                                           <h3>🗑</h3>
                                                       </Button>
                                                   </Card.Footer>
                                               </Card>
                                           </div>
                                       ))

                                   ):(
                                        <h4 style={{color: darkMode ? 'goldenrod' : 'darkgray'}}>No Orders</h4>
                                      )

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
