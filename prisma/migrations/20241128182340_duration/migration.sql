/*
  Warnings:

  - Added the required column `duration` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL;
