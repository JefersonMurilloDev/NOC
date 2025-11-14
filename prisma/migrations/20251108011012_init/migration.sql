-- CreateEnum
CREATE TYPE "severityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "level" "severityLevel" NOT NULL DEFAULT 'LOW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);
