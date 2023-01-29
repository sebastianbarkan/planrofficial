import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../utilities/prismaClient";

const ALLOWED_METHODS = ["GET"];

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.method || !ALLOWED_METHODS.includes(req.method)) res.status(400);
  try {
    const userId = req.query.userId;

    await prisma.questionSet.findFirst({
      where: {
        userId: userId,
      },
    });
    res.status(200).end();
  } catch (err) {
    res.status(400).end();
  }
}
