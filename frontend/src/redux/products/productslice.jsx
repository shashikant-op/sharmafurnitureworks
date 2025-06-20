import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

export const  fetchproducts=createAsyncThunk("fetchproducts",async({keyword="",currpage=1,price=[0,200000],category})=>{
    let key=keyword.trim();
    let link="";
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [minPrice, maxPrice] = price;
    if(category){
        link = `${backendurl}/products?keyword=${key}&page=${currpage}&price[gte]=${minPrice}&price[lte]=${maxPrice}&category=${category}`;
    }
    if (keyword) {
      link = `${backendurl}/products?keyword=${key}&page=${currpage}&price[gte]=${minPrice}&price[lte]=${maxPrice}`;
    } else {
      link = `${backendurl}/products?page=${currpage}&price[gte]=${minPrice}&price[lte]=${maxPrice}`;
    }
    const response=await fetch(link);
    const data=await response.json();
    return data;
})


const productslice=createSlice({
    name:"products",
    initialState:{
        isLoading:false,
        data:"",
        productcount:1,
        resultperpage:20,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchproducts.pending ,(state,action)=>{
            state.isLoading=true;
           
        })
        .addCase(fetchproducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
            state.productcount=action.payload.productcount;
        })
        .addCase(fetchproducts.rejected,(state,action)=>{
            state.error=action.payload;
        })
    }

})
export default productslice.reducer