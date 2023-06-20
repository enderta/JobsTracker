import React, {useEffect, useState} from 'react'

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
                let info = [];
                let orders = data.data;
                for (let i = 0; i < orders.length; i++) {
                    //today orders only
                    if(orders[i].created_at.split("T")[0] == new Date().toISOString().split("T")[0]){
                        info.push(orders[i]);
                    }

                }
                setBasket(info);
            })
    }, []);
    console.log(basket)
    return (
        <div>
basket
        </div>
    )
}

export default Basket
