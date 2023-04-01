import React, { useEffect, useState } from "react";

const ProductCards = ()=>{
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        getproduct();
    },[])
    const getproduct = async ()=>{
        let product = await fetch("http://localhost:5000/products");
        product = await product.json();
        setProducts(product);
    }
    return(
        <div className="container">
            <h1 className="heading">Product-List</h1>
            <div className="box-container">
                {
                    products.map((item)=>
                    <div className="box">
                        <span>Product-Id   :   </span>
                        <span>{item._id}</span>
                        <table className="box-table">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>    </td>
                                    <td>{item.name}</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>    </td>
                                    <td>{item.price}</td>
                                </tr>
                                <tr>
                                    <td>Category</td>
                                    <td>    </td>
                                    <td>{item.category}</td>
                                </tr>
                                <tr>
                                    <td>Companyc</td>
                                    <td>    </td>
                                    <td>{item.company}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProductCards;