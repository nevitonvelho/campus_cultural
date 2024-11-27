/*
  Warnings:

  - You are about to drop the column `attendanceId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_attendanceId_fkey";

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "attendanceId";

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
