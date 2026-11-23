import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";



const app: Application = express();

// middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  //   res.send('DevPulse Server!');
  res.status(200).json({
    success: true,
    message: "DevPulse server",
    author: "Rafee",
  });
});

app.use("/api/users", userRoute);

app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);
app.use(logger);
// 9.02 = 2.47

export default app;

// user.route.ts
// user.controller.ts
// user.service.ts
// user.interface.ts
