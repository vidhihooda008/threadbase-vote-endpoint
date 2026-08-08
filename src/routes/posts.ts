import { Router, Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

const router = Router();

// Stub auth middleware
const auth = (req: Request, res: Response, next: NextFunction) => {
  (req as any).user = { id: 1 };
  next();
};

router.post(
  "/:id/vote",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = parseInt(req.params.id);
    const userId = (req as any).user.id;

    // Invalid ID → 400
    if (isNaN(postId)) {
      return res.status(400).json({
        error: "invalid post id",
      });
    }

    try {
      const [vote, post] = await prisma.$transaction([
        prisma.vote.create({
          data: {
            userId,
            postId,
          },
        }),

        prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            score: {
              increment: 1,
            },
          },
        }),
      ]);

      return res.status(201).json({
        message: "vote recorded",
        score: post.score,
      });
    } catch (error: any) {
      console.log("Prisma error code:", error?.code);
      console.log("Prisma error message:", error?.message);

      if (error?.code === "P2002") {
        return res.status(409).json({
          error: "already voted",
        });
      }

      if (error?.code === "P2025") {
        return res.status(404).json({
          error: "post not found",
        });
      }

      next(error);
    }
  }
);

export default router;