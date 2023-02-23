import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Cart.css'
import axios from 'axios';






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
            "image_link": image
        }
        const url = `http://127.0.0.1:8081/orders/get_orders`;

        if (id === undefined) {
            try{

            axios.get(url).then
                (response => {
                    setCart(response.data);
                })
            }catch (error) {
                console.log(error);}
        }
        else {
            if (quantity === '0') {
                try{
                axios.get(url).then
                    (response => {
                        setCart(response.data);
                    })
                }  catch (error) {
                    console.log(error);}
            
            }
            else {
                try{
                axios.post(post_url, body).then
                    (response => {
                        axios.get(url).then
                            (response => {
                                setCart(response.data);
                            })

                    })
                }
                catch (error) {
                    console.log(error);}
            }


        }

    }, []);

    function RemoveItem(id) {
        const url = `http://127.0.0.1:8081/orders/delete_order?id=${id}`;
        const orderurl = `http://127.0.0.1:8081/orders/get_orders`;


        axios.delete(url).then
            (response => {
                axios.get(orderurl).then
                    (response => {
                        setCart(response.data);
                    })
            })




    }

    function getTotalPrice() {
        return cart.reduce(function (total, product) {
            return total + product.totalprice;
        }, 0);
    }





    return (
        <div>
            <Link to="/">
                <button className="btn btn-info" type="button">
                    Return to shopping              </button>
            </Link>
            {cart.length ? <Link to="/Confirmation" state={{ cart: cart }}>
                <button className="btn btn-primary" type="button">
                    Checkout          </button>
            </Link> :
                null}


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
                                    <p className="card-text">Quantity: {product.quantity}</p>
                                    <p className="card-text">Total Price: ${product.totalprice}</p>

                                    <label>Remove Item </label>
                                    <button onClick={() => RemoveItem(product.id)} type="button" className="cross" aria-label="Close">X</button>

                                </div>
                            </div>
                        </li>

                    )

                    }
                    <h2>Total Price: ${getTotalPrice()}</h2>
                </ul>


                : <h2 >Oops! Your Cart is empty</h2>}


        </div>
    )
}


export default Cart;