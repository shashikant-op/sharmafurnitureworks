import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchproductdetails } from "../redux/products/pdtlsslice";
import Rightside from "./productdetailssec";
import ProductSkeleton from "./Loader/productdetails";

const Product = () => {
  const [imgurl, setimgurl] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();

  
  

  const { isLoading, error, data } = useSelector((state) => state.product);
  const product = data?.product;

  useEffect(() => {
    dispatch(fetchproductdetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setimgurl(product.images[0].url);
    }
  }, [product]);
  

  const handleImageClick = (url) => {
    setimgurl(url);
  };
 

  if (isLoading) {
    return (
      <ProductSkeleton/>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center text-red-600 text-lg">
        Something went wrong: {error}
      </div>
    );
  }
  const perdis = Math.floor(100 - ((product?.price || 0) / (product?.oldprice || 180000)) * 100);


  return (
    <div className=" flex flex-col items-start justify-between md:flex-row bg-white  shadow-xl pd-1 md:p-6 lg:p-6 w-full ">
      {/* Left: Image Section */}
      <div className="flex flex-col  items-start">
        <img
          src={imgurl || product?.images[0].url}
          alt={product?.title}
          className=" md:rounded-lg lg:rounded-lg !w-[900px] h-[30vh] lg:h-[70vh]  object-cover"
        />

        <div className="flex gap-2 items-center justify-center  w-full  mt-4 flex-wrap">
          {product?.images?.length > 0 ? (
            product.images.map((image,index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-md border-2 cursor-pointer ${
                  imgurl === image.url ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => handleImageClick(image.url)}
              >
                <img
                  src={image.url}
                  alt="thumbnail"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-md" />
          )}
        </div>
      </div>

      {/* Right: Product Info Section */}
      <Rightside product={product} perdis={perdis}/>
   
    </div>
  );
};

export default Product;
