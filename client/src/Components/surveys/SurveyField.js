import React from 'react';

export default({input,label,meta:{error,touched}})=>{
    return(
        <div>
        <label>{label}</label>
        <input style={{marginBottom:'5px'}} {...input} className="validate"/> 
        {touched && error?<div style={{color:'red',marginBottom:'20px'}}>{error}</div>:''}
        </div>
    )

}