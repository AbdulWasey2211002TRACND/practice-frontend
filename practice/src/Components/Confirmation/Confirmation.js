import React from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



function Confirmation() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { cart} = state || {};



    useEffect(() => {
        if (cart === undefined) {
            navigate("/");

        }})


    return (
        
        <div>
            
                        <img className='image' src="https://raw.githubusercontent.com/jeff-lent/Alisnobba/main/Capstone/Logo.png" ></img>

           
            <h1>Hurrah! Thanks for your order!</h1>
            <Link to="/">
                <button style={{marginRight:"200"}} className="button" type="button">
                    Start Over
                </button>
            </Link>
            

            </div>
    )

}

export default Confirmation;