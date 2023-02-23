import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Product.css'
import axios from 'axios';

function Product() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id } = state || {};
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState([]);



    useEffect(() => {
        if (id === undefined) {
            navigate("/");

        }

        else {
            const url = `http://127.0.0.1:8080/products/get_product_by_id?id=${id}`;
            axios.get(url).then
                (response => {
                    setProduct(response.data)

                })
        }


    }, []);


    return (

        <div>
            {product.map((product) =>

                <li key={product.id}>
                    

                    <div className="my_card" >
                    <h4 style={{ color: "burlywood" }}>{product.name}</h4>

                        <img src={product.image_link} className="card-img-top" ></img>
                        <div className="card-body">
                            <p className="card-text"> <a>Short Description:</a> {product.short_description}</p>
                            <p className="card-text"> <a>Long Description:</a> {product.long_description}</p>
                            <p className="card-text"> <a>Price: $</a>{product.price}</p>
                            <label style={{ fontWeight: "bold" }} >Quantity: </label>
                            <input class="input" type="number" min={0} name="origin" id="quantity" defaultValue={1} onChange={(e) => setQuantity(e.target.value)} required ></input>
                            <Link to="/Cart" state={{ id: product.id,quantity:quantity,name:product.name,price:product.price,image:product.image_link }}>
                                <button className="btn btn-success" type="button">
                                    Add To Cart
                                </button>
                            </Link>
                        </div>
                    </div>
                </li>
            )}       </div>






    )

}




export default Product;