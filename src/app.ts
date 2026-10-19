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


// get all users
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "Users retrived successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

// get single user
app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  //console.log(id);

  try {
    const result = await pool.query(
      `
            SELECT * FROM users WHERE id=$1
            `,
      [id]
    );
    // if user not exists
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrived successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

// update user
app.put("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, role } = req.body;
    // console.log(id, {name, password, role});
    const result = await pool.query(
      `
    UPDATE users SET name=COALESCE($1, name) , password=COALESCE($2, password), role=COALESCE($3, role) WHERE id=$4 RETURNING *`,
      [name, password, role, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

// Delete user
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      DELETE FROM users WHERE id=$1`,
      [id]
    );

    if(result.rowCount === 0){
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User has been deleted successfully!",
    });


  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

export default app;

