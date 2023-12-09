/*
  Warnings:

  - The primary key for the `Certificado` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Certificado" DROP CONSTRAINT "Certificado_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Certificado_pkey" PRIMARY KEY ("id");
