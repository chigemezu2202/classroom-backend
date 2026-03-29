import 'dotenv/config';
import express, { Request, Response } from "express";
import cors from "cors";
import subjectsRouter  from "./routes/subjects";

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

// JSON middleware
app.use(express.json());

app.use('/api/subjects', subjectsRouter);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from TypeScript Express server!" });
});

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Server started and listening on ${url}`);
});