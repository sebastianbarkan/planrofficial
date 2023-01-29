import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../utilities/prismaClient";

const ALLOWED_METHODS = ["GET"];

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.method || !ALLOWED_METHODS.includes(req.method)) res.status(400);

  try {
    const userId = req.query.userId;

    const questionCount = await prisma.questionSet.findMany({
      where: {
        userId: userId,
      },
      select: {
        count: true,
      },
    });

    res.json({ questionCount: questionCount[0].count });
  } catch (err) {
    res.status(400).end();
  }
}
