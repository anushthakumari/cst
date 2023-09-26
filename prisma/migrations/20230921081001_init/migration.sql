-- CreateTable
CREATE TABLE "FullTimeJobs" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "desc" TEXT,
    "address" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FullTimeJobs_pkey" PRIMARY KEY ("id")
);
