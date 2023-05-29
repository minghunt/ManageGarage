import express from "express";
import cors from "cors";
import { connectDB } from "./db/connection.js";
import { PORT } from "./config/config.js";
import {
  carBrandsRoutes,
  paraRoutes,
  tiencongRoutes,
  phutungRoutes,
  loginRoutes,
  usersRoutes,
  carRoutes,
  phieusuachuaRoutes,
  phieuthuRoutes,
  phieunhapRoutes,
  baocaotonRoutes,
  baocaotonthangRoutes
} from "./routes/index.js";

const start = async () => {
  const app = express();
  connectDB();

  // Middleware
  app.use(express.json());
  app.use(cors());

  // Routes
  app.use("/api/cars-brand", carBrandsRoutes);
  app.use("/api/para", paraRoutes);
  app.use("/api/tiencong", tiencongRoutes);
  app.use("/api/phutung", phutungRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api", loginRoutes);
  app.use("/api/car", carRoutes);
  app.use("/api/phieunhap", phieunhapRoutes);
  app.use("/api/phieusuachua", phieusuachuaRoutes);
  app.use("/api/phieuthu", phieuthuRoutes);
  app.use("/api/baocaotonthang", baocaotonthangRoutes);
  app.use("/api/baocaoton", baocaotonRoutes);


  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();