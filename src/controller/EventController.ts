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
    return res.status(500).json({ message: "Erro ao criar evento" });
  }
};


export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany(); 

    return res.status(200).json(events); 
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar eventos" });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.findUnique({ where: { id: Number(id) } });

    if (!event) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar evento" });
  }
};


export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
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

    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        data: eventDate,
        location,
        authorId: Number(authorId),
      },
    });

    return res.status(200).json(event); 

  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar evento" });
  }
};


export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.findUnique({ where: { id: Number(id) } });

    if (!event) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    await prisma.event.delete({ where: { id: Number(id) } });

    return res.status(200).json({ message: "Evento deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar evento" });
  }
};
