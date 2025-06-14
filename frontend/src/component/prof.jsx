import React from "react";
import Rbutton from "./ux/roundbutton";
import { Link } from "react-router-dom";
function Prof(){
    return(
        <div>
            <div className="h-8 p-2 items-center  flex flex-row justify-between">
                <div className="w-50%">
                    <div className="w-[20px]  h-[20px]">
                        shashikant
                    </div>
                    </div>
                <div className="flex gap-x-5 flex-row justify-around">
                    <div className=""> icon</div>
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
    )
}
export default Prof; 