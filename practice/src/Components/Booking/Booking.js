import React from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './Booking.css'
import Confirmation from "../Confirmation/Confirmation";


function Booking() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { restuarent } = state || {};
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [tax, setTax] = useState(0);




    useEffect(() => {
        if (restuarent === undefined) {
            navigate("/");

        }

    }, []);

    useEffect(() => {



        var Difference_In_Time = endDate.getTime() - startDate.getTime();
        var TotalDays = Difference_In_Time / (1000 * 3600 * 24);
        var price = Math.round(TotalDays * (restuarent.price));
        setPrice(price)
        setTax(price * 0.12)

    }, [startDate, endDate]);

    
    function Confirmation(e) {

        navigate("/Confirmation", {
            state: {
                restuarent: restuarent,price:price,tax:tax,name:name,email:email,address:address
            }
        });

    }








return (

    <div>


        <form action="" onSubmit={Confirmation}>

            <Link to="/">
                <button className="btn btn-danger" type="button">
                    Cancel
                </button>
            </Link>
            <h4>Booking for <a style={{ color: "burlywood", fontSize: 30, fontFamily: "calibri" }}>{restuarent.name}</a></h4>
            <h4>Total Price $:   <a style={{ color: "burlywood", fontSize: 30, fontFamily: "calibri" }}>{price}</a></h4>
            <h4>Tax $:  <a style={{ color: "burlywood", fontSize: 30, fontFamily: "calibri" }}>{tax}</a></h4>

            <h5>Enter Your Details</h5>
            <div className="inputfield">
                <input className="myinput" type="text" name="name" id="name" placeholder='name' required value={name} onChange={(e) => setName(e.target.value)} ></input>
            </div>
            <div className="inputfield">
                <input className="myinput" type="text" name="address" id="address" placeholder='Address' required  value={address} onChange={(e) => setAddress(e.target.value)} ></input>
            </div>
            <div className="inputfield">
                <input className="myinput" type="email" name="email" id="email" placeholder='Email' required  value={email} onChange={(e) => setEmail(e.target.value)}  ></input>
            </div>

            <DatePicker minDate={new Date()} className="myinput" placeholderText="From Date" selected={startDate} onChange={(date) => setStartDate(date)} />


            <DatePicker minDate={new Date()} className="myinput" placeholderText="To Date" selected={endDate} onChange={(date) => setEndDate(date)} />





            <button style={{ backgroundColor: "#198754", borderBlockColor: "#198754", borderColor: "#198754" }} className="btn btn-primary" type="submit"> 
                Book My Stay
            </button>
        </form>







    </div>




);


}
export default Booking;