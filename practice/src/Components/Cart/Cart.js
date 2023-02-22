import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Cart.css'
import axios from 'axios';
import CloseButton from 'react-bootstrap/CloseButton';






function Cart() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { id, quantity } = state || {};
    const [product, setProduct] = useState("");
    const [cart, setCart] = useState([]);


    useEffect(() => {
        if (id === undefined) {
            navigate("/");

        }

        else {
            const url = `http://127.0.0.1:8080/products/get_product_by_id?id=${id}`;
            axios.get(url).then
                (response => {
                    setProduct(response.data)
                    setCart(response.data)

                })
             


        }


    }, []);




    return (
        <div>
            <h1>Your Cart</h1>

            {cart.map((product) =>


            <li key={product.id}>
                <div className="card" >
                    <img src={product.image_link} className="card-img-top" ></img>
                    <div className="card-body">
                        <h5 style={{ color: "Black", fontWeight: "bold" }} className="card-title">{product.name}</h5>
                        <p className="card-text">Price: ${product.price}</p>
                        <p className="card-text">Total Price: ${totalprice}</p>
                        <p className="card-text">Quantity: {quantity}</p>
                        
                            <CloseButton color='red' variant="red" />
                      
                    </div>
                </div>
            </li>

            )

            }


        </div>
    )
}


export default Cart;