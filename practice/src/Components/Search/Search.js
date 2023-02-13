import React, { useState } from 'react';
import './Search.css'
import axios from 'axios';


function Search() {

    const [origin, setOrigin] = useState("");
    const [allorigins, setAllOrigins] = useState([]);
    const [buttonvis, setVisibilty] = useState(true);


    function GetRestuarent(e) {
        const rest = `http://127.0.0.1:8080/hotels/get_hotel_by_location?location=${origin}`;
        e.preventDefault();

        axios.get(rest).then
            (response => {

                setAllOrigins(response.data)

            })
    }

    return (
        <div>
            <h1>Search your Desired Restuarent</h1>

            <form action="" onSubmit={GetRestuarent}>
                <div className="inputfield">
                    <input className="input" type="text" name="origin" id="origin" placeholder='Enter Origin' value={origin} onChange={(e) => setOrigin(e.target.value)} required ></input>
                </div>
                <button className="button" type="submit"> Search</button>
                

                
                
            

            </form>

            {allorigins.length?

            
            
                <ul>

                    {allorigins.map((i) =>
                    


                        <div className="card" >
                            <img src={i.image_link} className="card-img-top" ></img>
                            <div className="card-body">
                                <h5 className="card-title">{i.name}</h5>
                                <p className="card-text">{i.short_description}</p>
                                <a  class="btn btn-primary">View Details</a> 
                            </div>
                        </div>

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