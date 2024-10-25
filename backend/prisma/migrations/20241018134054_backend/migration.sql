-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestParameters" (
    "id" TEXT NOT NULL,
    "srNo" INTEGER NOT NULL,
    "rotorNo" TEXT NOT NULL,
    "a" DOUBLE PRECISION NOT NULL,
    "b" DOUBLE PRECISION NOT NULL,
    "c" DOUBLE PRECISION NOT NULL,
    "leftRadius" DOUBLE PRECISION NOT NULL,
    "rightRadius" DOUBLE PRECISION NOT NULL,
    "leftTolerance" DOUBLE PRECISION NOT NULL,
    "rightTolerance" DOUBLE PRECISION NOT NULL,
    "unitRPM" INTEGER NOT NULL,
    "correctionMode" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,

    CONSTRAINT "TestParameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResults" (
    "id" TEXT NOT NULL,
    "srNo" INTEGER NOT NULL,
    "rightResults" TEXT NOT NULL,
    "leftMass" DOUBLE PRECISION NOT NULL,
    "leftAngle" DOUBLE PRECISION NOT NULL,
    "rightAngle" DOUBLE PRECISION NOT NULL,
    "leftResults" TEXT NOT NULL,
    "rightMass" DOUBLE PRECISION NOT NULL,
    "reportId" TEXT NOT NULL,

    CONSTRAINT "TestResults_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestParameters" ADD CONSTRAINT "TestParameters_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResults" ADD CONSTRAINT "TestResults_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
