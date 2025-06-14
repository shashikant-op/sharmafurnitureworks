import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const  fetchproductdetails=createAsyncThunk("fetchproductdetails",async(id)=>{
    const response=await fetch(`http://localhost:8080/api/v1/productdetails/${id}`);
   
    const data=response.json();
    return data;
})
const productdetailsslice=createSlice({
    name:"product",
    initialState:{
        isLoading:false,
        data:{},
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchproductdetails.pending ,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(fetchproductdetails.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
        })
        .addCase(fetchproductdetails.rejected,(state,action)=>{
            state.error=action.payload;
        })
    }

})
export default productdetailsslice.reducer