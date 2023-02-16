import React, { useState } from 'react';
import './Search.css'
import axios from 'axios';
import 'react-dropdown/style.css';
import { Link } from 'react-router-dom';


function Search() {

    const [origin, setOrigin] = useState("");
    const [pool, setPool] = useState("");
    const [experience, setExperience] = useState("");
    const [allorigins, setAllOrigins] = useState([]);


    function GetRestuarent(e) {
        const body = {
            location: origin,
            experience: experience,
            pool: pool
        }

        const url = "http://127.0.0.1:8080/hotels/get_hotel";
        e.preventDefault();

        axios.post(url, body).then
            (response => {

                setAllOrigins(response.data)

            })


    }





    return (


        <div>

            <h1>Search your Desired Restuarent</h1>


            <form action="" onSubmit={GetRestuarent}>

                <div className="inputfield">
                    <input className="input" type="text" name="origin" id="origin" placeholder='Origin' value={origin} onChange={(e) => setOrigin(e.target.value)} required ></input>
                </div>


                <select className='dropdown' value={experience} onChange={(e) => setExperience(e.target.value)}>
                    <option value="" disabled selected hidden>Select Experience</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Budget">Budget</option>
                    <option value="Business">Business</option>
                </select>


                <select className='dropdown' value={pool} onChange={(e) => setPool(e.target.value)}>
                    <option value="" disabled selected hidden>Need Pool?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>


                <button className="button" type="submit"> Search</button>






            </form>

            {allorigins.length ?



                <ul>

                    {allorigins.map((i) =>


                        <li key={i.id}>
                            <div className="card" >
                                <img src={i.image_link} className="card-img-top" ></img>
                                <div className="card-body">
                                    <h5 style={{color:"burlywood"}} className="card-title">{i.name}</h5>
                                    <p className="card-text">{i.short_description}</p>
                                    <Link to="/Restuarent" state={{ id: i.id }}>
                                        <button  className="btn btn-success" type="button"> 
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </li>

                    )

                    }

                </ul>

                :
                <h2> Oops! No Hotels Found.</h2>
            }
        </div>




    )


}

export default Search;