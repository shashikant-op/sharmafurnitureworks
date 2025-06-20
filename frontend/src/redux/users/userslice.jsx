import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const loginuser=createAsyncThunk("auth/login",
    async(credential,{rejectWithValue})=>{
        try{
            const backendurl = import.meta.env.VITE_BACKEND_URL;
        const response=await axios.post(`${backendurl}login`,credential);
        console.log(response.data);
        return response.data;
        
        }catch(error){
            return rejectWithValue(error.message||"there is error in the login route");

        }
    }
);

export const registeruser = createAsyncThunk("auth/register",
  async (credential, { rejectWithValue }) => {
    try {
     const backendurl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${backendurl}register`, credential);
      console.log("Register Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("Register Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message || "There is an error in the register route");
    }
  }
);
const userslice=createSlice({
    name:"userdetails",
    initialState:{
        user:null,
        token:null,
        loading:false,
        error:null
    },
    reducers:{
        logout:(state)=>{
            state.user = null;
            state.token = null;
            state.loading = false;
            localStorage.removeItem("token");
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginuser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loginuser.fulfilled,(state,action)=>{
            state.loading=false;
            state.token=action.payload.token;
            state.user=action.payload.user;
            localStorage.setItem("token",action.payload.token);    
            state.error=null;
        })
        .addCase(loginuser.rejected,(state,action)=>{
            state.loading=true;
            state.error=action.payload;
        })
        .addCase(registeruser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(registeruser.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.token);
            state.error = null;
          })
          .addCase(registeruser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          
    }
})

export const{logout}=userslice.actions;
export default userslice.reducer;