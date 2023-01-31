import { NextApiResponse, NextApiRequest } from "next";
import prisma from "../../../../utilities/prismaClient";

const ALLOWED_METHODS = ["GET"];

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.method || !ALLOWED_METHODS.includes(req.method)) res.status(400);
  try {
    const userId = req.query.userId;

    const answers = await prisma.questionSet.findFirst({
      where: {
        userId: userId,
      },
      select: {
        location: true,
        dates: true,
        type: true,
        budget: true,
      },
    });

    res.json({ answers: answers });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
}
