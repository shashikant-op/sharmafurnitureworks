import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchproducts } from "../redux/products/productslice";
import Card from "./card";
import { useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./pagination.css";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import ProductHomeLoader from "../loader/producthomeloader";



function Allproducts() {
  const [searchparams] = useSearchParams();
  const [currpage, setcurrpage] = useState(1); // Default page is 1
  const [price,setprice]=useState([0,200000]);
  const keyword = searchparams.get("keyword") || "";
  const [showFilter, setShowFilter] = useState(false);
  const [category ,setcategory]=useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchproducts({ keyword, currpage,price ,category})); // Fetch products when page or keyword changes
  }, [dispatch, keyword, currpage,price,category]);

  const { isLoading, error, resultperpage, productcount } = useSelector(
    (state) => state.products
  );
  const data = useSelector((state) => state.products.data);
  const products = data ? data.products : [];

  const setpage = (pageNumber) => {
    setcurrpage(pageNumber); // Update current page
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
  };
  console.log(products);
  const handleChange=(event,price)=>{
    setprice(price);
  }

  return (
    <>
   {/* Mobile Filter Toggle Button */}
<div className="sm:hidden flex justify-between items-center px-4 py-2 bg-white shadow-sm">
  <button
    onClick={() => setShowFilter(!showFilter)}
    className="px-4 text-purple-400 py-2 text-sm font-semibold  bg-white rounded-md"
  >
    {showFilter ? "Hide Filters" : "Show Filters"}
  </button> 
</div>
<div
  className={`transition-all duration-300 ease-in-out overflow-hidden ${
    showFilter ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
  } sm:max-h-full sm:opacity-100 sm:block bg-white border-t sm:border-none`}
>
  <div className="w-full px-4 py-4 bg-white shadow-sm sm:shadow-none rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-200 sm:border-none">
    {/* Price Filter */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-[60%]">
      <span className="text-base font-semibold text-gray-800">Price Range</span>
      <div className="w-full sm:w-72">
        <Slider
          value={price}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={0}
          max={200000}
        />
      </div>
    </div>

    {/* Category Links */}
    <div className="flex flex-wrap justify-start sm:justify-end gap-3 text-sm font-medium text-gray-700 w-full sm:w-[40%]">
      {["Living", "Study", "Decoration", "Bed", "Door", "Puja", "Chair", "Kitchen"].map(
        (category) => (
         <span
          onClick={()=>{
            setcategory(category)
          }}
            key={category}
            className="cursor-pointer px-3 py-1 rounded-full bg-gray-100 hover:bg-purple-800 hover:text-white transition-all duration-200"
          >
            {category}
            </span>
        )
      )}
    </div>
  </div>
</div>

    <div>
      {isLoading ? (
        <ProductHomeLoader />
      ) : (
        <div className="mb-[24px] pt-5 bg-white gap-2 flex flex-row justify-center flex-wrap">
          {products && products.length > 0 ? (
            products.map((product) => (
              <Card key={product._id} product={product} />
            ))
          ) : (
            <ProductHomeLoader />
          )}
        </div>
      )}

      {/* Pagination Section */}
      <div className="pagination">
        
        <Pagination
          activePage={currpage}
          itemsCountPerPage={resultperpage}
          totalItemsCount={productcount}
          pageRangeDisplayed={5} // Show 5 page numbers at a time
          
          nextPageText="Next →"
          prevPageText="← Prev"
          onChange={setpage} // Call setpage to change page
          itemClass="page-item"
          linkClass="page-link"
          activeClass="activepageclass"
          activeLinkClass="activepagelink"
        />
      </div>
      </div>
    </>
  );
}

export default Allproducts;
