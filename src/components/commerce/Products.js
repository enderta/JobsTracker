import React, {useEffect, useState} from 'react'
import {Card} from "react-bootstrap";

function Products() {
    const [prod, setProd] = useState([]);
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');




    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            setProd(data.data);
        }

        fetchData();
    }, []);
    console.log(prod)

    return (
        <div>
            <div className="d-flex justify-content-center">
                {
                    prod.map((product) => (
                        <Card style={{width: '18rem', margin: '10px', backgroundColor: darkMode ? 'darkolivegreen' : ""}}>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    {product.description}
                                </Card.Text>
                                <Card.Text>
                                    {product.price}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default Products