import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../utilities/prismaClient";

const ALLOWED_METHODS = ["POST"];

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.method || !ALLOWED_METHODS.includes(req.method)) res.status(400);

  try {
    const sections = ["location", "budget", "type", "dates"];
    const { answer, userId } = req.body;

    const { count } = await prisma.questionSet.findFirst({
      where: {
        userId: userId,
      },
      select: {
        count: true,
      },
    });

    await prisma.questionSet.update({
      where: {
        userId: userId,
      },
      data: {
        count: count + 1,
        [sections[count]]: answer,
      },
    });

    res.send({ message: "success" });
  } catch (err) {
    console.log("err", err);
    res.status(400).end();
  }
}
