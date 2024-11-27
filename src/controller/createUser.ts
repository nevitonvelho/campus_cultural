import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { hash } from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { name, email, password, registroAcademico } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já registrado" });
    }

    const hashedPassword = await hash(password, 8);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        registroAcademico,
      },
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
};
