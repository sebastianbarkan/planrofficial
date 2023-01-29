import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../utilities/prismaClient";

const ALLOWED_METHODS = ["POST"];

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.method || !ALLOWED_METHODS.includes(req.method)) res.status(400);

  try {
    const { userId } = req.body;

    await prisma.questionSet.create({
      data: {
        userId: userId,
        dates: "",
        budget: "",
        type: "",
        location: "",
        count: 0,
      },
    });

    res.status(201).end();
  } catch (err) {
    res.status(400).end();
  }
}
