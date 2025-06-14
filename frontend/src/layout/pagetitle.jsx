import React from "react";
import Helemt from "react-helmet";

const Pagetitle=({title})=>{
    return(
        <Helemt>
            <title>{title}</title>
        </Helemt>
    )
}
export default Pagetitle