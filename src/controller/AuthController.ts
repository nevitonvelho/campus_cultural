import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    const token = sign({ userId: user.id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Erro no login"});
  }
};
