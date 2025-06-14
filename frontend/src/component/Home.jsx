import React from "react";
import Banner from "../banner/banner";
import Card from "./card";
import Pagetitle from "../layout/pagetitle";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchproducts } from "../redux/products/productslice";
import Featurecard from "../banner/featurecard";
import Bannerm from "../banner/bannermobile";
import HtmlComponent from "../loader/producthomeloader";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
const productx = {
  title: "Wooden bed made by sesame wood",
  images: [
    { url: "https://m.media-amazon.com/images/I/71g+jlUUJgL._SL1476_.jpghttps://m.media-amazon.com/images/I/71g+jlUUJgL._SL1476_.jpg" },
  ],
  price: 80000,
  _id: "bed1",
  oldprice: 120000,
  ratings: 3.5,
  noofratings: 300,
};

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchproducts({ keyword: "" }));
  }, [dispatch]);

  const { isLoading, error } = useSelector((state) => state.products);
  const data = useSelector((state) => state.products.data);
  const products = data?.products || [];

  return (
    <main className="flex-1 mt-0.5">
      <Pagetitle title="Opendoor" />
      <div className="hidden lg:flex mb-[24px]">
        <Banner />
      </div>
      <div className="flex lg:hidden mb-[5px]">
        <Bannerm />
      </div>
      <div className="p-1">
        <div className="flex start-0 text-black text-[18px] px-1 bg-transparent  p-1">
          <div className="producttitle w-full flex flex-row justify-between px-3 p-2 mb-2">
            <div>
              <span className="!w-full ">All Products</span>
            </div>
            <div>
              <Link  className="cursor-pointer" to={"/products"} >
              <GoArrowRight  />
              </Link>

            </div>
          </div>
        </div>
        {isLoading ? (
          <HtmlComponent />
        ) : (
          <div className="w-full custom-scrollbar overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="flex gap-4 bg-white p-2 !w-full justify-start">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} >
                    <Card product={product} />
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

