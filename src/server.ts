import express, { type Application, type Request, type Response } from "express";
import { Pool } from "pg";
const app: Application = express();
const port = 5000;

// middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_MDaUbydw9Rz5@ep-wild-dew-b4jlhys8-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDB = async () => {
    try {
        await pool.query(`

            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            email VARCHAR(100) NOT NULL,
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
 

app.get('/', (req: Request, res: Response) => {
    //   res.send('DevPulse Server!');
    res.status(200).json({
        "message": "DevPulse server",
        "author": "Rafee",
    });
});

app.post('/', async (req: Request, res: Response) => {
    try {  
        const { name, email, password, role } = req.body;
        
        const result = await pool.query(
            `INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,  
            [name, email, password, role]
        );
        
        // 🌟 result.rows[0] contains the actual row saved by Postgres (including id, created_at, etc.)
        res.status(201).json({
            message: "Created response",
            data: result.rows[0] 
        });
   } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "Failed to create user",
            error: error instanceof Error ? error.message : "Unknown error"
        });
   }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

// 7-6: 4.36

