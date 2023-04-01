import React,{useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import { TextField,Button } from "@material-ui/core";

const Login = ()=>{
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [errorEmail,setErrormail]=useState(false);
    const [error,setError]=useState(false);
    const [errorPassword,setErrorPassword]=useState(false);
    // const [HelperText,sethelperText]=useState("Enter Password Here...");


    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){navigate('/')}
    },[])
    const handleLogin = async ()=>{
        if(!email || !password){
            setError(true);
            return false;
        }

        let result = await fetch("http://localhost:5000/login",{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result = await result.json();
        console.warn(result);
        if(!result){
            console.warn(result);
            setErrormail(true);
        }else if(password!=result.password){
            setErrorPassword(true);
        }else if(result && (password===result.password)){
            console.warn(result);
            localStorage.setItem("user",JSON.stringify(result));
            navigate('/');
        }
    }
    return(
        <div className="signupBody">
        <h1 className="heading">Login</h1>
        {/* <input className="inputBox" type="text" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter Email" /> */}
        <div style={{ margin:"auto",width:"70%"}}>
            <TextField 
                style={{marginTop:20}}
                // style={{background:"#282c34",color:"aquamarine"}}
                label='Enter Email'
                fullWidth
                color="primary"
                variant="outlined"
                size="small"
                margin="dense"
                value={email} 
                required
                onChange={(e)=>setEmail(e.target.value)}
                />
        </div>
        <div style={{ margin:"auto",width:"70%"}}>
            <TextField 
                style={{marginTop:20}}
                label='Password'
                type="password"
                fullWidth
                color="primary"
                variant="outlined"
                size="small"
                value={password} 
                margin="dense"
                required
                onChange={(e)=>setPassword(e.target.value)}
                />
        </div>
        <Button  variant="outlined" style={{ margin:20,background:"#282c34",color:"aquamarine",width:"50%"}} type="button" onClick={handleLogin}>Login</Button>
        {/* <input className="inputBox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Enter Password" /> */}
        {(error && (!password || !email)) &&<div className="error-msg">Valid Password and Email required</div>}
        {errorEmail || errorPassword &&<div className="error-msg">*Please enter valid Password or Email</div>}
        </div>
    )
}

export default Login