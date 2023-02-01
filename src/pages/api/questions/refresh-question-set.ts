import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../utilities/prismaClient";

const ALLOWED_METHODS = ["POST"];

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.method || !ALLOWED_METHODS.includes(req.method)) res.status(400);

  try {
    const { userId } = req.body;

    await prisma.questionSet.delete({
      where: {
        userId: userId,
      },
    });

    res.send({ message: "success" });
  } catch (err) {
    console.log("err", err);
    res.status(400).end();
  }
}
