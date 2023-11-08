-- CreateTable
CREATE TABLE "Student" (
    "matricula" INTEGER NOT NULL,
    "cpf" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "endereco_eth" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashSenha" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("matricula")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cargaHoraria" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificado" (
    "endereco_eth" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentMatricula" INTEGER NOT NULL,
    "idCurso" INTEGER NOT NULL,

    CONSTRAINT "Certificado_pkey" PRIMARY KEY ("endereco_eth")
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" SERIAL NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "idCurso" INTEGER NOT NULL,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StudentToTurma" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_endereco_eth_key" ON "Student"("endereco_eth");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentToTurma_AB_unique" ON "_StudentToTurma"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentToTurma_B_index" ON "_StudentToTurma"("B");

-- AddForeignKey
ALTER TABLE "Certificado" ADD CONSTRAINT "Certificado_studentMatricula_fkey" FOREIGN KEY ("studentMatricula") REFERENCES "Student"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificado" ADD CONSTRAINT "Certificado_idCurso_fkey" FOREIGN KEY ("idCurso") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_idCurso_fkey" FOREIGN KEY ("idCurso") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToTurma" ADD CONSTRAINT "_StudentToTurma_A_fkey" FOREIGN KEY ("A") REFERENCES "Student"("matricula") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToTurma" ADD CONSTRAINT "_StudentToTurma_B_fkey" FOREIGN KEY ("B") REFERENCES "Turma"("id") ON DELETE CASCADE ON UPDATE CASCADE;
