import express, { type Application, type Request, type Response } from "express";
import {Pool} from "pg";
const app :  Application = express();
const port = 5000;

// middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));


const pool = new Pool({
connectionString: "postgresql://neondb_owner:npg_MDaUbydw9Rz5@ep-wild-dew-b4jlhys8-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});



app.get('/', (req: Request, res: Response) => {
//   res.send('DevPulse Server!');
res.status(200).json({
    "message": "DevPulse server",
    "author": "Rafee",
});
});

app.post('/', async(req:Request, res:Response)=>{
    //console.log(req.body );
    const {name, email, password} = req.body;
    res.status(201).json({
        message:"Created response",
        data: {
            name, email,
        }
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

//  7-3 Setting Up Postgres with Neon Serverless Cloud