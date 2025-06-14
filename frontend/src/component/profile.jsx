import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthPage from "./userlogin/login";
import { logout } from "../redux/users/userslice";
import { useNavigate } from "react-router-dom";
import { userdetails } from "../redux/users/userdetailsslice";
import Rbutton from "./ux/roundbutton";   
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userdata = useSelector((state) => state.userdetail);
  console.log(userdata); //there is problem server error after logout
  const token = localStorage.getItem("token");

 useEffect(() => {
  if(token){
     dispatch(userdetails(token));
  }
   
  }, [dispatch,token]);

 

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (token) {
    return (
       <>
        <div>
                   <div className="h-10 mt-1  p-2 items-center  flex flex-row justify-between">
                       <div className="w-50% flex items-center  gap-x-2  flex-row">
                           <div className="w-[30px] rounded-full bg-red-400  h-[30px]">
                              
                           </div>
                           <div>
                            {userdata?.data?.name}
                           </div>
                            
                           </div>
                       <div className="flex gap-x-5 flex-row justify-around">
                           <div className=""> <button onClick={handleLogout}>Log-out</button></div>
                       <div>Address</div>
                       </div>
                       
                   </div>
                   <div className="profileheader flex flex-row justify-evenly p-2 mt-2">
                       <Link className="!text-black"  to={"/orders"}><Rbutton value={"Orders"}/></Link>
                        <Link className="!text-black" ><Rbutton value={"Buy Again"}/></Link>
                         <Link className="!text-black"  to={"/me"}><Rbutton value={"Account"}/></Link>
                          <Link className="!text-black" to={"/dashboard"}><Rbutton value={"DashBoard"}/></Link>
                   </div>
               </div>
               </>
    );
  } else {
    return <AuthPage />;
  }
};

export default Profile;
