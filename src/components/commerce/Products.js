import React, {useEffect, useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import Basket from './Basket';

function Products() {
    const [products, setProducts] = useState([]);
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
    const [quantities, setQuantities] = useState([]);

    const handleQuantity = (productId, quantity) => {
        const newQuantities = [...quantities];
        const index = newQuantities.findIndex(item => item.productId === productId);

        if (index === -1) {
            newQuantities.push({productId, quantity});
        } else {
            newQuantities[index].quantity = quantity;
        }

        setQuantities(newQuantities);
    }

    const handleAddToBasket = (product, userID) => {
        const quantity = quantities.find(item => item.productId === product.id)?.quantity || 1;
        // eslint-disable-next-line react-hooks/rules-of-hooks

        if (localStorage.getItem('token')) {
            const data = {
                product_id: product.id,
                user_id: userID,
                quantity: quantity,
                price: product.price,
                total_amount: product.price * quantity,
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
                    if (data.status === 'success') {
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
                        style={{width: '18rem', margin: '10px', backgroundColor: darkMode ? '#3656a2' : 'white',}}
                    >
                        <Card.Img variant="top" src={product.image}/>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text>
                                <div className="quantity-control">
                                    <Button
                                        style={{border: 'none'}}
                                        variant={darkMode ? 'outline-danger' : 'outline-dark'}
                                        onClick={() => handleQuantity(product.id, parseInt(quantities.find(item => item.productId === product.id)?.quantity || 1) - 1)}
                                        disabled={parseInt(quantities.find(item => item.productId === product.id)?.quantity || 1) <= 1}
                                    >
                                        ▼
                                    </Button>
                                    <h4 style={{margin: '0 10px',color: darkMode ? 'goldenrod' : 'darkgray'}}>{quantities.find(item => item.productId === product.id)?.quantity || 1}
                                        {" "}{quantities?.find(item => item.productId === product.id)?.quantity > 1 ? 'pieces' : 'piece'}
                                    </h4>
                                    <Button
                                        style={{border: 'none'}}
                                        variant={darkMode ? 'outline-success' : 'outline-dark'}
                                        onClick={() => handleQuantity(product.id, parseInt(quantities.find(item => item.productId === product.id)?.quantity || 1) + 1)}
                                        disabled={parseInt(quantities.find(item => item.productId === product.id)?.quantity || 1) >= 10}
                                    >
                                        ▲
                                    </Button>
                                </div>
                            </Card.Text>


                            <Card.Text>Price:{" "}{product.price}</Card.Text>
                            <Card.Text>Pay:{" "}
                                {parseFloat(product.price *
                                    (quantities.find(item => item.productId === product.id)?.quantity || 1)).toFixed(2)}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                variant={darkMode ? 'outline-warning' : 'outline-dark'}
                                onClick={() => handleAddToBasket(product, localStorage.getItem('userId'))}
                            >
                                Add to cart 🛒
                            </Button>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Products;
