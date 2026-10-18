import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config";
const app: Application = express();
const port = config.port;

// middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: config.connectionString ,
});

const initDB = async () => {
  try {
    await pool.query(`

            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(20) DEFAULT 'Contributor' NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            
        )
            `);
    console.log("Database connected successfully!!");
  } catch (error) {
    console.log(error);
  }
};
initDB();

app.get("/", (req: Request, res: Response) => {
  //   res.send('DevPulse Server!');
  res.status(200).json({
    success: true,
    message: "DevPulse server",
    author: "Rafee",
  });
});

app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const result = await pool.query(
      `INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, password, role]
    );
    console.log(result);
    // 🌟 result.rows[0] contains the actual row saved by Postgres (including id, created_at, etc.)
    res.status(201).json({
      success: true,
      message: "created user successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: error.message,
      error: error,
      //error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
