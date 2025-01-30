import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import "dotenv/config";

//App Config

const PORT = process.env.PORT || 5000;
const app = express();
await connectDB();

//Initialize Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://photo-wipe-self.vercel.app",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

// API routes
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.listen(PORT, () => console.log("Server Running on port " + PORT));
