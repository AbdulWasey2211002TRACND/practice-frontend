import React from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



function Confirmation() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { restuarent,price,tax,name,address,email} = state || {};



    useEffect(() => {
        if (restuarent === undefined) {
            navigate("/");

        }})


    return (
        <div>
             <Link to="/">
                <button className="btn btn-danger" type="button">
                    Start Over
                </button>
            </Link>
            <h1>Congratulations, Your booking has been confirmed!</h1>


            <div  className="card" >

                <div  className="card-body">
                    <h5 style={{ color: "burlywood" }} className="card-title">Hotel Booked: {restuarent.name} </h5>
                    <p className="card-text">Name: {name}</p>
                    <p className="card-text">Email: {email}</p>
                    <p className="card-text">Address: {address}</p>
                    <p className="card-text">Total Price: ${price}</p>
                    <p className="card-text">Tax: ${tax}</p>
                 
                </div>
            </div>
        </div>
    )

}

export default Confirmation;