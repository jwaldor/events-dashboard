/*
  Warnings:

  - Added the required column `rawText` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "rawText" TEXT NOT NULL;
