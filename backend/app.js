const express =require("express");
const Errormiddleware=require("./middleware/errormiddleware");
const cookieparser=require("cookie-parser");
const cors=require("cors");

const app=express();
app.use(express.json());
app.use(cookieparser());
app.use(cors());

//routes


const ProductRoutes=require("./routes/productsroutes");
const UserRoutes=require("./routes/userRoutes");
const OrderRoutes=require("./routes/orderRoutes");
const cookieParser = require("cookie-parser");

app.use("/api/v1",ProductRoutes);
app.use("/api/v1",UserRoutes);
app.use("/api/v1",OrderRoutes);

//error middleware
app.use(Errormiddleware);
module.exports=app;