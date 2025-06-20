import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userdetails=createAsyncThunk("user/details",
    async(token)=>{
        const backendurl = import.meta.env.VITE_BACKEND_URL;
         const response = await axios.get(`${backendurl}me`, {
      headers: {
        Authorization: `Bearer ${token}`,//adding barer
      },
         });
   
        console.log(response.data);
        return response.data;
    })
    const userslice=createSlice({
        name:"userdetail",
        initialState:{
            data:"",
            loading:"false",
            error:null
        },
        extraReducers:(builder)=>{
            builder
            .addCase(userdetails.pending,(state)=>{
                state.loading="true";
            })
            .addCase(userdetails.fulfilled,(state,action)=>{
                    state.data=action.payload.user;
                    state.loading="false";
                    
            })
            .addCase(userdetails.rejected,(state,action)=>{
                state.data=null;
                state.error=action.payload;
            })
        }
        
    })
    export default userslice.reducer

    