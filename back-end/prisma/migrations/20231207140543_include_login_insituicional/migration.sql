-- CreateTable
CREATE TABLE "loginInstitucional" (
    "email" TEXT NOT NULL,
    "hashSenha" TEXT NOT NULL,

    CONSTRAINT "loginInstitucional_pkey" PRIMARY KEY ("email")
);
