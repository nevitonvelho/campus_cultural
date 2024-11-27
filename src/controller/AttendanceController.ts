import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const getAllAttendance = async (req: Request, res: Response) => {
  try {
    const attendances = await prisma.attendance.findMany({
      select: {
        id: true,
        name: true,
        User: { select: { name: true } },
        event: { select: { title: true } },
      },
    });

    return res.status(200).json(attendances);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao obter inscrições" });
  }
};
