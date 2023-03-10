import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import LoginUser from "../../Functions";


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

import './Login.css'





function Login() {



    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [password, setPassword] = useState("")


    function Auth(e){
        e.preventDefault();
        const role = "user"
        const auth = LoginUser(email,password,role);
    
        if (auth==="Success"){
            navigate("/Search")
        }
    
        else{
            setMessage("Wrong Credentials")
        }
    }


    
    return (
        <MDBContainer className="my-10">

            <MDBCard>
                <MDBRow className='g-0'>

                    <MDBCol md='6'>
                        <MDBCardImage src='https://media.licdn.com/dms/image/C4D22AQFbOlsu5REbnQ/feedshare-shrink_800/0/1673672180443?e=1681344000&v=beta&t=q0pkzE2_Vuidhi6UjPJb0i6UOOBzV27Gv-rtMy9ToPA' alt="login form" className='rounded-start w-100' />
                    </MDBCol>

                    <MDBCol md='6'>
                        <MDBCardBody className='d-flex flex-column'>

                            <div className='d-flex flex-row mt-2'>
                                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                                <span className="h1 fw-bold mb-0">Xloop Digital</span>
                            </div>

                            <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                            <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} required />


                            <button className="btn btn-dark" onClick={Auth}>Login</button>
                            <br></br>


                            {message ?
                                <p >{message}</p> :
                                <p>{message}</p>

                            }
                            <Link to="/Admin">
                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Login as<a style={{ color: '#393f81' }}> Admin</a></p>

                            </Link>




                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>

        </MDBContainer>
    );
}

export default Login;