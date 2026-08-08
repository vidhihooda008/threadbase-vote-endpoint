import express from "express";
import postsRouter from "./routes/posts";

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("FULL ERROR:", err);

    res.status(500).json({
      error: "internal server error",
      message: err?.message,
      name: err?.name,
      code: err?.code,
    });
  }
);

app.listen(3000, () => {
  console.log("Threadbase API running on http://localhost:3000");
});