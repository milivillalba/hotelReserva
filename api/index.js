import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import alquilerRoute from "./routes/alquiler.js";
import roomRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();

//mongodb://127.0.0.1:27017/gestiondb
const conectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/miAlqui");
    console.log("conected to mongodb");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconected", () => {
  console.log("mongodb disconected");
});
mongoose.connection.on("connectado", () => {
  console.log("mongodb conencte");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//rutas}
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", alquilerRoute);
app.use("/api/room", roomRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  conectDB();
  console.log("conect to backend.");
});
