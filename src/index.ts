import 'dotenv/config';
import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT;

// JSON middleware
app.use(express.json());

// Root route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from TypeScript Express server!" });
});

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Server started and listening on ${url}`);
});