import express from "express";
import cors from "cors";
import { connectDB } from "./db/connection.js";
import { PORT } from "./config/config.js";
import {
  carBrandsRoutes,
  paraRoutes,
  tiencongRoutes
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


  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();