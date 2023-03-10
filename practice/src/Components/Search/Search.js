import React, { useState, useEffect } from 'react';
import './Search.css'
import axios from 'axios';
import 'react-dropdown/style.css';
import { Link } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';


function Search() {

    // const [origin, setOrigin] = useState("");
    // const [pool, setPool] = useState("");
    // const [experience, setExperience] = useState("");
    // const [allorigins, setAllOrigins] = useState([]);
    // const [message,setMessage] = useState("What are you waiting for? Search it!");



    // useEffect(() => {
    //     const storedRestuarents = localStorage.getItem("restuarents");
    //     if (storedRestuarents) {
    //         setAllOrigins(JSON.parse(storedRestuarents));
    //     }
    //   }, []);

    // function GetRestuarent(e) {
    //     const body = {
    //         location: origin,
    //         experience: experience,
    //         pool: pool
    //     }

    //     const url = "http://127.0.0.1:8080/hotels/get_hotel";
    //     e.preventDefault();

    //     axios.post(url, body).then
    //         (response => {

    //             setAllOrigins(response.data)
    //             localStorage.setItem("restuarents",  JSON.stringify(response.data));
    //             if (!response.data.length){
    //                 setMessage("Oops! No Hotels found. Try again with another search.")
    //             }

    //         })




    // }





    return (


        <div>
            <img className='image' src="https://www.xloopdigital.com/wp-content/uploads/2022/07/xloop-TM-logo.png" ></img>


            <h1>Enter Your Information</h1>

            <MDBContainer className="my-10">

                <MDBCard>
                    <div className='d-flex flex-row mt-2'>
                        <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                        <span className="h1 fw-bold mb-0">Introduction</span>
                    </div>
                    <MDBRow className='g-0'>

                        <MDBCol md='13'>
                            <MDBCardBody className='d-flex flex-column'>

                                <br></br>

                                <label>Full Name</label>
                                <MDBInput wrapperClass='mb-4' id='formControlLg' type='text' size="lg" required />
                                <label>Introduction</label>

                                <MDBInput wrapperClass='mb-4'  id='Introduction' type='text' size="lg" required />
                                <label>Department</label>

                                <MDBInput wrapperClass='mb-4'  id='Department' type='text' size="lg" required />
                                <label>Skills</label>

                                <MDBInput wrapperClass='mb-4'  id='Skills' type='text' size="lg" required />








                            </MDBCardBody>
                        </MDBCol>

                    </MDBRow>
                </MDBCard>

            </MDBContainer>


            <MDBContainer className="my-10">

                <MDBCard>
                    <div className='d-flex flex-row mt-2'>
                        <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                        <span className="h1 fw-bold mb-0">Education</span>
                    </div>
                    <MDBRow className='g-0'>

                        <MDBCol md='13'>
                            <MDBCardBody className='d-flex flex-column'>

                                <br></br>

                                <label>Degree Name</label>
                                <MDBInput wrapperClass='mb-4' id='formControlLg' type='text' size="lg" required />
                                
                                <label>Degree Start Date</label>

                                <MDBInput wrapperClass='mb-4'  id='formControlLg' type='date' size="lg" required />

                                <label>Degree End Date</label>

                                <MDBInput wrapperClass='mb-4'  id='formControlLg' type='date' size="lg" required />







                            </MDBCardBody>
                        </MDBCol>

                    </MDBRow>
                </MDBCard>

            </MDBContainer>


            <MDBContainer className="my-10">

                <MDBCard>
                    <div className='d-flex flex-row mt-2'>
                        <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                        <span className="h1 fw-bold mb-0">Certification</span>
                    </div>
                    <MDBRow className='g-0'>

                        <MDBCol md='13'>
                            <MDBCardBody className='d-flex flex-column'>

                                <br></br>

                                <label>Title</label>
                                <MDBInput wrapperClass='mb-4' id='formControlLg' type='text' size="lg" required />
                                
                                <label>Authority Name</label>

                                <MDBInput wrapperClass='mb-4'  id='formControlLg' type='text' size="lg" required />

                                <label>Year</label>

                                <MDBInput wrapperClass='mb-4'  id='formControlLg' type='number' size="lg" required />







                            </MDBCardBody>
                        </MDBCol>

                    </MDBRow>
                </MDBCard>

            </MDBContainer>


        </div>




    )


}

export default Search;