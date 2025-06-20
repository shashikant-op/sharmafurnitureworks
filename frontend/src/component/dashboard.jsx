import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    productimg: [],
    productspecificationimg: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productimg" || name === "productspecificationimg") {
      setProductData({ ...productData, [name]: Array.from(files) });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);

      for (let i = 0; i < productData.productimg.length; i++) {
        formData.append("productimg", productData.productimg[i]);
      }

      for (let i = 0; i < productData.productspecificationimg.length; i++) {
        formData.append(
          "productspecificationimg",
          productData.productspecificationimg[i]
        );
      }
       
      const res = await axios.post(
        "http://localhost:8080/api/v1/admin/product/new",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("✅ Product created successfully!");

      setProductData({
        name: "",
        description: "",
        price: "",
        productimg: [],
        productspecificationimg: [],
      });
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md border border-purple-200"
    >
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          required
          className="p-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={productData.description}
          onChange={handleChange}
          required
          rows={4}
          className="p-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="number"
          name="price"
          placeholder="Product Price (₹)"
          value={productData.price}
          onChange={handleChange}
          required
          min={0}
          className="p-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Upload Product Images */}
        <div>
          <label className="font-semibold text-purple-700">Product Images</label>
          <input
            type="file"
            name="productimg"
            accept="image/*"
            multiple
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-purple-300 rounded-xl w-full file:cursor-pointer file:bg-purple-100 hover:file:bg-purple-200 file:border-none file:text-purple-800"
          />
          {productData.productimg.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {productData.productimg.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  alt="Product"
                  className="w-20 h-20 object-cover border rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        {/* Upload Specification Images */}
        <div>
          <label className="font-semibold text-purple-700">Specification Images</label>
          <input
            type="file"
            name="productspecificationimg"
            accept="image/*"
            multiple
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-purple-300 rounded-xl w-full file:cursor-pointer file:bg-purple-100 hover:file:bg-purple-200 file:border-none file:text-purple-800"
          />
          {productData.productspecificationimg.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {productData.productspecificationimg.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  alt="Spec"
                  className="w-20 h-20 object-cover border rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="!bg-purple-700 !text-white py-3 rounded-xl transition duration-300 hover:!bg-purple-800 disabled:!bg-purple-400"
        >
          {loading ? "Submitting..." : "Submit Product"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Dashboard;
