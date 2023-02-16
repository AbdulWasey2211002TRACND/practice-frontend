import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './RestInfo.css'
import axios from 'axios';

function RestInfo() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id } = state || {};
    const [restuarent, setRestuarent] = useState([]);


    useEffect(() => {
        if (id === undefined) {
            navigate("/");

        }

        else {
            const url = `http://127.0.0.1:8080/hotels/get_hotel_by_id?id=${id}`;
            axios.get(url).then
                (response => {
                    setRestuarent(response.data)

                })
        }


    }, []);

    console.log(restuarent)


    return (


        <ul>
            <h4 style={{color:"burlywood"}}>{restuarent.name}</h4>

            <Link to="/">
                <button style={{color:"white"}} className="btn btn-info" type="button">
                    Return to Results
                </button>
            </Link>

            <ul>
                <li key={restuarent.id}>

                    <div className="card" >
                        <img src={restuarent.image_link} className="card-img-top" ></img>
                        <div className="card-body">
                            <p className="card-text"> <a>Short Description:</a> {restuarent.short_description}</p>
                            <p className="card-text"> <a>Long Description:</a> {restuarent.long_description}</p>
                            <p className="card-text"> <a>Location:</a> {restuarent.location}</p>
                            <p className="card-text"> <a>Experience:</a> {restuarent.experience}</p>
                            <p className="card-text"> <a>Pool Availabilty:</a> {restuarent.pool}</p>
                            <p className="card-text"> <a>Price: $</a>{restuarent.price}</p>
                            <Link to="/Booking" state={{ restuarent: restuarent }}>
                                <button className="btn btn-success" type="button">
                                    Book
                                </button>
                            </Link>
                        </div>
                    </div>
                </li>
            </ul>





        </ul>

    )

}




export default RestInfo;