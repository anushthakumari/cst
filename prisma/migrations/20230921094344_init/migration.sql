/*
  Warnings:

  - Added the required column `salary` to the `FullTimeJobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FullTimeJobs" ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shift" TEXT;
