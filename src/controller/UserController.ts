import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { hash } from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  try {
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
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await prisma.user.delete({ where: { id: Number(id) } });

    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany(); 

    return res.status(200).json(users); 
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar usuários" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params; 
  const { name, email, password, registroAcademico } = req.body; 

  try {
    if (email) {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email já registrado" });
      }
    }

    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await hash(password, 8);
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password: hashedPassword ?? undefined,
        registroAcademico,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};
