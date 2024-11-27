import { Request, Response } from "express";
import { prisma } from "../database/prisma";  

export const createEvent = async (req: Request, res: Response) => {
  const { title, content, data, location, authorId } = req.body;

  try {
    const eventDate = new Date(data);  

    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({ message: "Data inválida" });
    }

    const author = await prisma.user.findUnique({ where: { id: Number(authorId) } });

    if (!author) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const event = await prisma.event.create({
      data: {
        title,
        content,
        data: eventDate,
        location,
        authorId: Number(authorId), 
      },
    });

    return res.status(201).json(event); 

  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar evento"});
  }
};
