import React,{useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const AddProduct = ()=>{
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const [error,setError]=useState(false);
    const addProduct = async ()=>{
        if(!name || !price || !category || !company){
            setError(true);
            return false;

        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product",{
            method:"post",
            body:JSON.stringify({name,price,userId,category,company}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result = await result.json();
        console.warn(result);
        alert("Product Added Succesfully:=>XD")
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
    }
    return(
        <div className="product">
            <h1 className="heading">Add-Product</h1>
            <div style={{ margin:"auto",width:"70%"}}>
            <TextField 
                style={{marginTop:20}}
                label='Enter  Product Name'
                fullWidth
                color="primary"
                variant="outlined"
                size="small"
                margin="dense"
                value={name} 
                required
                onChange={(e)=>setName(e.target.value)}
                />
        </div>
        {error && !name &&<span className="error-msg">Enter valid name</span>}
        <div style={{ margin:"auto",width:"70%"}}>
            <TextField 
                style={{marginTop:20}}
                label='Enter  Product Price'
                fullWidth
                color="primary"
                variant="outlined"
                size="small"
                margin="dense"
                value={price} 
                required
                onChange={(e)=>setPrice(e.target.value)}
                />
            </div>
            {error && !price && <span className="error-msg">Enter valid price</span>}

            <div style={{ margin:"auto",width:"70%"}}>
            <TextField 
                style={{marginTop:20}}
                label='Enter  Product Category'
                fullWidth
                color="primary"
                variant="outlined"
                size="small"
                margin="dense"
                value={category} 
                required
                onChange={(e)=>setCategory(e.target.value)}
                />
            </div>
            {error && !category && <span className="error-msg">Enter valid category</span>}

            <div style={{ margin:"auto",width:"70%"}}>
            <TextField 
                style={{marginTop:20}}
                label='Enter  Product Company'
                fullWidth
                color="primary"
                variant="outlined"
                size="small"
                margin="dense"
                value={company} 
                required
                onChange={(e)=>setCompany(e.target.value)}
                />
            </div>
            {error && !company && <span className="error-msg">Enter valid company</span>}

            <Button  variant="outlined" style={{ margin:20,background:"#282c34",color:"aquamarine",width:"50%"}} type="button" onClick={addProduct}>Add-Product</Button>
        </div>
    )
}

export default AddProduct;