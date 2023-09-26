/*
  Warnings:

  - You are about to drop the column `to_day` on the `parttimejobs` table. All the data in the column will be lost.
  - You are about to drop the column `to_time` on the `parttimejobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "parttimejobs" DROP COLUMN "to_day",
DROP COLUMN "to_time",
ADD COLUMN     "end_day" TEXT,
ADD COLUMN     "end_time" TIMESTAMP(3);
