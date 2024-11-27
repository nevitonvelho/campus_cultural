/*
  Warnings:

  - You are about to drop the column `descricao` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sobrenome` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tipoUser` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "descricao",
DROP COLUMN "foto",
DROP COLUMN "sobrenome",
DROP COLUMN "tipoUser",
ADD COLUMN     "registroAcademico" TEXT;
