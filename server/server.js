import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import { connectDB } from "./db/connection.js";
import cors from "cors";
import {
  coursesRoutes,
  cartRoutes,
  categoriesRoutes,
  topicsRoutes,
  usersRoutes,
  loginRoutes,
  lecturersRoutes,
  topWeeksRoutes,
  facebookUsersRoutes,
  billingRoutes,
} from "./routes/index.js";
import * as models from "./models/index.js";
import { PORT } from "./config/config.js";
import * as config from "./config/config.js";
import * as AdminJSMongoose from "@adminjs/mongoose";

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const DEFAULT_ADMIN = {
  email: "admin@example.com",
  password: "password",
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const start = async () => {
  const app = express();
  connectDB();

  // Middleware
  app.use(express.json());
  app.use(cors());

  // Admin setup
  const adminOptions = {
    resources: [
      models.courseModel,
      models.cartModel,
      models.categoryModel,
      models.userModel,
      models.lecturerModel,
      models.topicModel,
      models.topWeekModel,
      models.facebookUserModel,
      models.billingModel,
    ],
  };

  const admin = new AdminJS(adminOptions);

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: "sessionsecret",
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
      secret: "sessionsecret",
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    }
  );

  app.use(admin.options.rootPath, adminRouter);

  // Routes
  app.use("/api/courses", coursesRoutes);


  // Start server
  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}` +
        "  email: 'admin@example.com',password: 'password',"
    );
  });
};

start();