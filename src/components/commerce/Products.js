import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Basket from './Basket';

function Products() {
    const [products, setProducts] = useState([]);
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

    const handleAddToBasket = (product, userID) => {
        if (localStorage.getItem('token')) {
            const data = {
                product_id: product.id,
                user_id: userID,
                quantity: 1,
                price: product.price,
                total_amount: product.price * 1,
            };

            fetch(`http://localhost:5000/api/basket/${userID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.success) {
                        window.location = '/basket';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            alert('Please login to add to basket');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setProducts(data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);
    console.log(products);
    return (
        <div>
            <div className="d-flex justify-content-center">
                {products.map(product => (
                    <Card
                        key={product.id}
                        style={{ width: '18rem', margin: '10px', backgroundColor: darkMode ? 'darkolivegreen' : '' }}
                    >
                        <Card.Img variant="top" src={product.image} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text>{product.price}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                variant={darkMode ? 'outline-warning' : 'outline-dark'}
                                onClick={() => handleAddToBasket(product, localStorage.getItem('userId'))}
                            >
                                Add to basket
                            </Button>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Products;
