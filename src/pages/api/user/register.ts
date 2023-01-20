import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "utilities/prismaClient";
import bcrypt from "bcrypt";

const ALLOWED_METHODS = ["POST"];

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.method || !ALLOWED_METHODS.includes(req.method)) res.status(400);

  try {
    const { username, password } = req.body;
    if (!username) {
      res.status(400);
      throw new Error("Missing parameter: username");
    }

    if (!password) {
      res.status(400);
      throw new Error("Missing parameter: password");
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      res.status(400).json({ message: "Username is taken." });
      throw new Error("User already exists: ", username);
    }

    const user = await prisma.user.create({
      data: {
        username: username,
        password: bcrypt.hashSync(password, 12),
      },
    });

    if (!user) res.status(400);

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};
