import React, {useEffect, useState} from 'react'

function Basket() {
    const [orderItems, setOrderItems] = useState([]);
    const [basketItems, setBasketItems] = useState([]);

    //fetch order items
    const orders = async () => {
        //get orders from the database into basketItems
        const response = await fetch('http://localhost:5000/api/order_items');
        const data = await response.json();
        setBasketItems(data.data);

    }

    useEffect(() => {
        orders().then(r => console.log(r));
    }, []);


    //add order to the basket
    const addToBasket = (product) => {
        const exist = basketItems.find((x) => x.id === product.id);
        if (exist) {
            setBasketItems(
                basketItems.map((x) =>
                    x.id === product.id ? {...exist, qty: exist.qty + 1} : x
                )
            );
        } else {
            setBasketItems([...basketItems, {...product, qty: 1}]);
        }
    }

    //remove order from the basket
    const removeFromBasket = (product) => {
        const exist = basketItems.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            setBasketItems(basketItems.filter((x) => x.id !== product.id));
        } else {
            setBasketItems(
                basketItems.map((x) =>
                    x.id === product.id ? {...exist, qty: exist.qty - 1} : x
                )
            );
        }
    }


    return (
        <div>OrderItems</div>
    )
}

export default Basket
