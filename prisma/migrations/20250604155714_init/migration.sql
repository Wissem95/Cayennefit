-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "city_mpg" DOUBLE PRECISION NOT NULL,
    "highway_mpg" DOUBLE PRECISION NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "drive" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "images" TEXT[],
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "sold_at" TIMESTAMP(3),

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);
