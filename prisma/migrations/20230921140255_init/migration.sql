-- CreateTable
CREATE TABLE "parttimejobs" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "desc" TEXT,
    "address" TEXT,
    "city" TEXT,
    "zipcode" INTEGER,
    "shift" TEXT,
    "salary" DOUBLE PRECISION,
    "pay_per_hour" DOUBLE PRECISION,
    "from_time" TIMESTAMP(3),
    "to_time" TIMESTAMP(3),
    "from_day" TEXT,
    "to_day" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "parttimejobs_pkey" PRIMARY KEY ("id")
);
