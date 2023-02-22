import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Cart.css'
import axios from 'axios';
import CloseButton from 'react-bootstrap/CloseButton';






function Cart() {

    const { state } = useLocation();
    const { id, quantity, price, name, image } = state || {};
    const [cart, setCart] = useState([]);



    useEffect(() => {

        const post_url = `http://127.0.0.1:8081/orders/add_orders`;
        const body = {
            "productid": id,
            "name": name,
            "price": price,
            "totalprice": price * quantity,
            "quantity": quantity,
            "image": image
        }
        const url = `http://127.0.0.1:8081/orders/get_orders`;
        console.log(id)

        if (id === undefined) {

            axios.get(url).then
                (response => {
                    setCart(response.data);
                })
        }
        else {
            axios.post(post_url, body).then
                (response => {
                })

            axios.get(url).then
                (response => {
                    setCart(response.data);
                })

        }

    }, []);




    return (
        <div>
            <h1>Your Cart</h1>

            {cart.length ?
                <ul>
                    {cart.map((product) =>


                        <li key={product.id}>
                            <div className="card" >
                                <img src={product.image_link} className="card-img-top" ></img>
                                <div className="card-body">
                                    <h5 style={{ color: "Black", fontWeight: "bold" }} className="card-title">{product.name}</h5>
                                    <p className="card-text">Price: ${product.price}</p>
                                    <p className="card-text">Quantity: {quantity}</p>

                                    <CloseButton color='red' variant="red" />

                                </div>
                            </div>
                        </li>

                    )
                    }
                </ul>

                : <h2 >Oops! Your Cart is empty</h2>}


        </div>
    )
}


export default Cart;