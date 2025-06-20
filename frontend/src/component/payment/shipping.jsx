import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShippingInfo } from "../../redux/cart/cartslice";
import { Country, State } from "country-state-city";
import {
  MdPinDrop,
  MdHomeWork,
  MdLocationCity,
  MdOutlineTransferWithinAStation,
  MdLocalPhone,
  MdPublic,
} from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  const dispatch = useDispatch();
  const { shippinginfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippinginfo.address || "");
  const [city, setCity] = useState(shippinginfo.city || "");
  const [state, setState] = useState(shippinginfo.state || "");
  const [country, setCountry] = useState(shippinginfo.country || "");
  const [pincode, setPincode] = useState(shippinginfo.pincode || "");
  const [phoneno, setPhoneno] = useState(shippinginfo.phoneno || "");
 const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setShippingInfo({ address, city, state, country, pincode, phoneno }));
  };
const handleproceed=()=>{
  navigate("/confirm");
}
  return (
    <Fragment>
      <div className="lg:mt-7 flex justify-center items-center overflow-visible">
        <form
          onSubmit={handleSubmit}
          className=" bg-white w-full max-w-3xl shadow-xl p-8 md:p-12 overflow-visible"
        >
          <h2 className="text-2xl font-semibold text-purple-800 mb-6 text-center">
            Shipping Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2  gap-6 overflow-visible">
            <InputField
              icon={<MdHomeWork className="text-gray-500" />}
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <InputField
              icon={<MdLocationCity className="text-gray-500" />}
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <InputField
              icon={<MdPinDrop className="text-gray-500" />}
              type="number"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
            <InputField
              icon={<MdLocalPhone className="text-gray-500" />}
              type="number"
              placeholder="Phone No"
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
              required
            />

            {/* Country Dropdown */}
            <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100 relative z-50 overflow-visible">
              <MdPublic className="text-gray-500 mr-2" />
              <select
                className="bg-gray-100 w-full outline-none appearance-none cursor-pointer z-50"
                required
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setState("");
                }}
              >
                <option value="">Select Country</option>
                {Country.getAllCountries().map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State Dropdown */}
            {country && (
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100 relative z-50 overflow-visible">
                <MdOutlineTransferWithinAStation className="text-gray-500 mr-2" />
                <select
                  className="bg-gray-100 w-full outline-none appearance-none cursor-pointer z-50"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {State.getStatesOfCountry(country).map((s) => (
                    <option key={s.isoCode} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <button
            type="submit"
            onClick={handleproceed}
            className="mt-8 w-full flex justify-center items-center gap-2 !bg-purple-800 hover:!bg-purple-900 text-white font-medium py-3 px-4 rounded-lg transition"
          >
            <FaShippingFast />
            Proceed
          </button>
        </form>
      </div>
    </Fragment>
  );
};

const InputField = ({
  icon,
  placeholder,
  value,
  onChange,
  required = false,
  type = "text",
}) => (
  <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100">
    {icon}
    <input
      type={type}
      className="bg-gray-100 w-full outline-none ml-2"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default Shipping;
