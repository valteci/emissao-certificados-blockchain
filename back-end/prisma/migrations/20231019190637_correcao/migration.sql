/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[cpf]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Certificado" DROP CONSTRAINT "Certificado_studentMatricula_fkey";

-- DropForeignKey
ALTER TABLE "_StudentToTurma" DROP CONSTRAINT "_StudentToTurma_A_fkey";

-- AlterTable
ALTER TABLE "Certificado" ALTER COLUMN "studentMatricula" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
ALTER COLUMN "matricula" SET DATA TYPE TEXT,
ALTER COLUMN "cpf" SET DATA TYPE TEXT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("matricula");

-- AlterTable
ALTER TABLE "_StudentToTurma" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_cpf_key" ON "Student"("cpf");

-- AddForeignKey
ALTER TABLE "Certificado" ADD CONSTRAINT "Certificado_studentMatricula_fkey" FOREIGN KEY ("studentMatricula") REFERENCES "Student"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToTurma" ADD CONSTRAINT "_StudentToTurma_A_fkey" FOREIGN KEY ("A") REFERENCES "Student"("matricula") ON DELETE CASCADE ON UPDATE CASCADE;
