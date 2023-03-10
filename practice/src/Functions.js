import axios from 'axios';

function LoginUser(email,password,role) {

    const url = "http://127.0.0.1:8080/auth-api/login";
    const body = { email: email, password: password }
    if (email === "waseysiddique11@gmail.com" && password === "wasey123") {
        return "Success"

    }

    else {
        return "Wrong Credentials"


    }
    // axios.post(login, body).then
    //     (response => {

    //         if (response.data.message==="Login Successful"){
    //             navigate( "/home",  { state: {
    //                 data: response.data.message }});

    //         } 
    //         else{
    //             alert(response.data.message)
    //         }

    //      })




}

export default LoginUser;