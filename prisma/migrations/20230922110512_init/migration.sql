-- CreateTable
CREATE TABLE "acommodations" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "desc" TEXT,
    "address" TEXT,
    "city" TEXT,
    "zipcode" INTEGER,
    "n_bedrooms" INTEGER,
    "is_private_washroom" BOOLEAN,
    "gender_pref" TEXT,
    "room_type" TEXT,
    "accom_type" TEXT,
    "main_floor_rent" DOUBLE PRECISION,
    "basement_floor_rent" DOUBLE PRECISION,
    "first_month_last_month_rent" BOOLEAN,
    "util_extra" BOOLEAN,
    "move_in_date" TIMESTAMP(3),
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "acommodations_pkey" PRIMARY KEY ("id")
);
