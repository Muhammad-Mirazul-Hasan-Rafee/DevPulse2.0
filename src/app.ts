import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config";
import { initDB, pool } from "./db";
import { userRoute } from "./modules/user/user.route";
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

  
 app.use('/api/users', userRoute);

app.use('/api/profile', )


export default app;



// user.route.ts
// user.controller.ts
// user.service.ts
// user.interface.ts

// 8.5 last mins