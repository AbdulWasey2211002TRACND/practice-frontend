import React, { useState, useEffect } from 'react';
import './Home.css'
import axios from 'axios';
import 'react-dropdown/style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Home() {


    const [allProducts, setAllProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
 
    


    useEffect(() => {
        const url = `http://127.0.0.1:8080/products/get_products`;
        try{
        axios.get(url).then
            (response => {
                setAllProducts(response.data)

            })
        } catch (error) {
            console.log(error);
        }


    }, []);








    return (


        <div>
          <Link  to="/Cart">
          <div className='cart'>Cart <FontAwesomeIcon size='50' icon={faShoppingCart} /></div>
         </Link>

            <img className='image' src="https://raw.githubusercontent.com/jeff-lent/Alisnobba/main/Capstone/Logo.png" ></img>


            <h1>Buy Your Desired Product</h1>


            {allProducts.map((i) =>


                <li key={i.id}>
                    <div className="card" >
                        <img src={i.image_link} className="card-img-top" ></img>
                        <div className="card-body">
                            <Link to="/Product" state={{ id: i.id }}>
                                <h5 style={{ color: "Black", fontWeight: "bold" }} className="card-title">{i.name}</h5>
                            </Link>

                            <p className="card-text">{i.short_description}</p>
                            <p className="card-text">Price: ${i.price}</p>
                            <label >Quantity: </label>
                            <input class="input" type="number" min={0} name="origin" id="quantity" defaultValue={1} onChange={(e) => setQuantity(e.target.value)} required ></input>
                            <Link to="/Cart" state={{ id: i.id,quantity:quantity,name:i.name,price:i.price,image:i.image_link }}>
                                <button className="btn btn-success" type="button">
                                    Add To Cart
                                </button>
                            </Link>
                        </div>
                    </div>
                </li>

            )

            }



        </div>




    )


}

export default Home;